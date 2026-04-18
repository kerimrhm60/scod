import { Product, Sale } from "@prisma/client";
import { CreateSaleDto, UpdateSaleDto } from "../../dtos/sale/saleDto";
import {
  SaleResponseDto,
  SaleTotalAmountDto,
} from "../../dtos/sale/saleResponseDto";
import { SaleRepository } from "../../repository/prisma/salerepository";
import { HttpStatus, Response } from "../../response/response";

import { ISaleService } from "../interface/ısaleService";
import { SaleWithProductDto } from "../../dtos/sale/saleWithProductDto";
import { ProductRepository } from "../../repository/prisma/productrepository";
import { CustomerRepository } from "../../repository/prisma/customerrepository";

export class SaleManager implements ISaleService {
  private saleRepository: SaleRepository;
  private productRepository: ProductRepository;
  private customerRepository: CustomerRepository;

  constructor() {
    this.saleRepository = new SaleRepository();
    this.productRepository = new ProductRepository();
    this.customerRepository = new CustomerRepository();
  }
  public async createSale(
    request: CreateSaleDto | CreateSaleDto[]
  ): Promise<Response<boolean>> {
    try {
      if (Array.isArray(request)) {
        const salesToCreate = request.map((sale) => ({
          ProductID: sale.ProductID,
          SaleDate: sale.SaleDate,
          SaleType: sale.SaleType,
          UserID: sale.UserID,
          ClientID: sale.ClientID,
          TotalAmount: sale.TotalAmount,
          Quantity: sale.Quantity,
        }));

        await this.saleRepository.createMany(salesToCreate);

        for (const sale of request) {
          await this.productRepository.decrementField(
            "ProductID",
            sale.ProductID,
            "Stok_Quantity",
            sale.Quantity
          );
        }
      } else {
        // Tekli kayıt
        await this.saleRepository.create({
          ProductID: request.ProductID,
          SaleDate: request.SaleDate,
          UserID: request.UserID,
          ClientID: request.ClientID,
          TotalAmount: request.TotalAmount,
          Quantity: request.Quantity,
        });

        await this.productRepository.decrementField(
          "ProductID",
          request.ProductID,
          "Stok_Quantity",
          request.Quantity
        );
      }

      return Response.success<boolean>(
        true,
        "Satış/satışlar başarıyla oluşturuldu",
        HttpStatus.CREATED
      );
    } catch (error) {
      console.error("Satış oluşturulurken hata:", error);
      return Response.failure<boolean>(
        "Satış oluşturulamadı",
        false,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async saleList(userId: number): Promise<Response<SaleResponseDto[]>> {
    try {
      const sales = await this.saleRepository.getWithRelationsByUserId<
        {
          ProductID: number;
          SaleDate: Date;
          Quantity: number;
        },
        { ProductName: string; SalePrice: number },
        "ProductName" | "SalePrice"
      >(userId, {
        relationName: "product",
        selectFields: ["ProductName", "SalePrice"] as const,
      });

      if (!sales || sales.length === 0) {
        return Response.success<SaleResponseDto[]>(
          [],
          "Kullanıcıya ait satış bulunamadı",
          HttpStatus.NOT_FOUND
        );
      }

      const saleDtos: SaleResponseDto[] = sales.map((sale) => ({
        ProductID: sale.ProductID,
        ProductName: sale.product.ProductName,
        SalePrice: sale.product.SalePrice,
        SaleDate: sale.SaleDate,
        Quantity: sale.Quantity,
      }));

      return Response.success<SaleResponseDto[]>(
        saleDtos,
        "Satışlar başarıyla getirildi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Satışlar getirilirken hata:", error);
      return Response.failure<SaleResponseDto[]>(
        "Satışlar getirilirken hata oluştu",
        [],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async saleTotalList<T extends "standard" | "debt" | "all">(
    userId: number,
    type: T
  ): Promise<Response<SaleResponseDto[]>> {
    try {
      let saleTypesToFilter: string[] | undefined;

      if (type === "standard") {
        saleTypesToFilter = ["Nakit", "Kart"];
      } else if (type === "debt") {
        saleTypesToFilter = ["debt"];
      } else if (type === "all") {
        saleTypesToFilter = undefined;
      }

      const query: any = { UserID: userId };
      if (saleTypesToFilter) {
        query.SaleType = { in: saleTypesToFilter };
      }

      const saless = await this.saleRepository.getManyQueryable(
        (q) => query
      );

      const sales = saless.sort(
        (a, b) =>
          new Date(b.SaleDate).getTime() - new Date(a.SaleDate).getTime()
      );
      if (!sales || sales.length === 0) {
        return Response.success(
          [],
          "Satış kaydı bulunamadı",
          HttpStatus.NOT_FOUND
        ) as any;
      }
      const productIds = [...new Set(sales.map((r) => r.ProductID))];

      const clientIds = [
        ...new Set(sales.map((r) => r.ClientID).filter((id) => id !== null)),
      ];

      const clients = await this.customerRepository.getClientsByIds(
        "ClientID",
        clientIds,
        { ClientName: true, ClientID: true, ClientSurname: true }
      );

      const products = await this.productRepository.getProductsByIds(
        "ProductID",
        productIds,
        {
          ProductID: true,
          ProductName: true,
          SalePrice: true,
          StockType: true,
          Stok_Quantity: true,
          PurchasePrice: true,
        }
      );
      const returnDtos = sales.map((r) => ({
        ProductID: r.ProductID,
        ProductName:
          products.find((p) => p.ProductID === r.ProductID)?.ProductName || "",
        Stok_Quantity:
          products.find((p) => p.ProductID === r.ProductID)?.Stok_Quantity ||
          "",
        StockType:
          products.find((p) => p.ProductID === r.ProductID)?.StockType || "",
        PurchasePrice:
          products.find((p) => p.ProductID === r.ProductID)?.PurchasePrice ||
          "",
        SalePrice:
          products.find((p) => p.ProductID === r.ProductID)?.SalePrice || 0,
        SaleDate: r.SaleDate,
        ClientID: r.ClientID,
        ClientName:
          clients.find((c) => c.ClientID === r.ClientID)?.ClientName || "",
        ClientSurname:
          clients.find((c) => c.ClientID === r.ClientID)?.ClientSurname || "",
        SaleID: r.SaleID,
        Quantity: r.Quantity,
      }));

      return Response.success(
        returnDtos,
        "İadeler başarıyla getirildi",
        HttpStatus.OK
      ) as any;
    } catch (error) {
      console.error("İadeler getirilirken hata:", error);
      return Response.failure(
        "İadeler getirilirken hata oluştu",
        [],
        HttpStatus.INTERNAL_SERVER_ERROR
      ) as any;
    }
  }

  public async saleTotalAmount(
    userId: number
  ): Promise<Response<SaleTotalAmountDto>> {
    try {
      const sales = await this.saleRepository.getManyQueryable((q: any) => ({
        UserID: userId,
        SaleType: { in: ["Nakit", "Kart"] },
      }));
      const debtSale = await this.saleRepository.getManyQueryable((q: any) => ({
        UserID: userId,
        SaleType: "debt",
      }));

      if (!sales || sales.length === 0) {
        return Response.success<SaleTotalAmountDto>(
          undefined,
          "Kullanıcıya ait satış bulunamadı",
          HttpStatus.NOT_FOUND
        );
      }

      const total = sales.reduce(
        (sum, sale) => sum + (sale.TotalAmount || 0),
        0
      );
      const debtTotal = debtSale.reduce(
        (sum, debtSale) => sum + (debtSale.TotalAmount || 0),
        0
      );

      const dto: SaleTotalAmountDto = {
        TotalAmount: total,
        DebtTotal: debtTotal,
      };

      return Response.success<SaleTotalAmountDto>(
        dto,
        "Toplam satış tutarı başarıyla getirildi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Toplam satış tutarı getirilirken hata:", error);
      return Response.failure<SaleTotalAmountDto>(
        "Toplam satış tutarı getirilirken hata oluştu",
        undefined,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async updateSale(
    request: UpdateSaleDto | UpdateSaleDto[]
  ): Promise<Response<boolean>> {
    try {
      if (Array.isArray(request)) {
        for (const item of request) {
          await this.saleRepository.update("SaleID", item.SaleID, {
            ProductID: item.ProductID,
            SaleDate: item.SaleDate,
            SaleType: item.SaleType,
            UserID: item.UserID,
            TotalAmount: item.TotalAmount,
            Quantity: item.Quantity,
          });
        }
      } else {
        await this.saleRepository.update("SaleID", request.SaleID, {
          ProductID: request.ProductID,
          SaleDate: request.SaleDate,
          SaleType: request.SaleType,
          UserID: request.UserID,
          TotalAmount: request.TotalAmount,
          Quantity: request.Quantity,
        });
      }

      return Response.success<boolean>(
        true,
        "Satış başarıyla güncellendi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Satış güncellenirken hata:", error);
      return Response.failure<boolean>(
        "Satış güncellenemedi",
        false,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
