import { CreateReturnDto } from "../../dtos/return/return";
import {
  ReturnResponseDto,
  ReturnSupplierResponseDto,
  ReturnTotalResponseDto,
} from "../../dtos/return/returnlResponseDto";
import { CustomerRepository } from "../../repository/prisma/customerrepository";
import { ProductRepository } from "../../repository/prisma/productrepository";
import { PurchasesRepository } from "../../repository/prisma/purchasesrepository";
import { ReturnRepository } from "../../repository/prisma/returnrepository";
import { SaleRepository } from "../../repository/prisma/salerepository";
import { SuplierRepository } from "../../repository/prisma/suplierrepository";
import { HttpStatus, Response } from "../../response/response";
import { IReturnService } from "../interface/ıreturnService";

export class ReturnManager implements IReturnService {
  private returnRepository: ReturnRepository;
  private productRepository: ProductRepository;
  private customerRepository: CustomerRepository;
  private supplierRepository: SuplierRepository;
  constructor() {
    this.returnRepository = new ReturnRepository();
    this.productRepository = new ProductRepository();
    this.customerRepository = new CustomerRepository();
    this.supplierRepository = new SuplierRepository();
  }
  public async createReturn(
    request: CreateReturnDto
  ): Promise<Response<boolean>> {
    try {
      if (Array.isArray(request)) {
        const returnToCreate = request.map((returnData) => ({
          ProductID: returnData.ProductID,
          ReturnDate: returnData.ReturnDate,
          UserID: returnData.UserID,
          ReturnType: returnData.ReturnType,
          TotalAmount: returnData.TotalAmount,
          ClientID: returnData.ClientID,
          ReturnDescription: returnData.ReturnDescription,
          SaleID: returnData.SaleID,
          Quantity: returnData.Quantity,
        }));

        await this.returnRepository.createMany(returnToCreate);
        for (const item of request) {
          if (item.ReturnType === "supplier") {
            await this.productRepository.decrementField(
              "ProductID",
              item.ProductID,
              "Stok_Quantity",
              item.Quantity
            );
          } else if (item.ReturnType === "customer") {
            await this.productRepository.incrementField(
              "ProductID",
              item.ProductID,
              "Stok_Quantity",
              item.Quantity
            );
          }
        }
      } else {
        await this.returnRepository.create({
          ProductID: request.ProductID,
          ReturnDate: request.ReturnDate,
          UserID: request.UserID,
          ReturnType: request.ReturnType,
          TotalAmount: request.TotalAmount,
          ReturnDescription: request.ReturnDescription,
          SaleID: request.SaleID,
          ClientID: request.ClientID,
          Quantity: request.Quantity,
        });

        if (request.ReturnType === "supplier") {
          await this.productRepository.decrementField(
            "ProductID",
            request.ProductID,
            "Stok_Quantity",
            request.Quantity
          );
        } else if (request.ReturnType === "customer") {
          await this.productRepository.incrementField(
            "ProductID",
            request.ProductID,
            "Stok_Quantity",
            request.Quantity
          );
        }
      }

      return Response.success<boolean>(
        true,
        "İade kaydı başarıyla oluşturuldu",
        HttpStatus.CREATED
      );
    } catch (error) {
      return Response.failure<boolean>(
        "İade kaydı oluşturulamadı",
        false,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  public async returnTotalAmount(
    userId: number
  ): Promise<Response<ReturnTotalResponseDto>> {
    try {
      const customerReturns = await this.returnRepository.getManyQueryable(
        () => ({
          UserID: userId,
          ReturnType: "customer",
        })
      );

      const supplierReturns = await this.returnRepository.getManyQueryable(
        () => ({
          UserID: userId,
          ReturnType: "supplier",
        })
      );

      const customerTotal = customerReturns.reduce(
        (sum, ret) => sum + (ret.TotalAmount || 0),
        0
      );
      const supplierTotal = supplierReturns.reduce(
        (sum, ret) => sum + (ret.TotalAmount || 0),
        0
      );

      const dto: ReturnTotalResponseDto = {
        saleReturnTotal: customerTotal,
        purchaseReturnTotal: supplierTotal,
      };

      return Response.success<ReturnTotalResponseDto>(
        dto,
        "Toplam iade tutarları başarıyla getirildi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Toplam iade tutarları getirilirken hata:", error);
      return Response.failure<ReturnTotalResponseDto>(
        "Toplam iade tutarları getirilirken hata oluştu",
        undefined,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async returnList<T extends "customer" | "supplier">(
    userId: number,
    type: T
  ): Promise<
    Response<
      T extends "customer" ? ReturnResponseDto[] : ReturnSupplierResponseDto[]
    >
  > {
    try {
      const returnss = await this.returnRepository.getManyQueryable(() => ({
        UserID: userId,
        ReturnType: type,
      }));

      const returns = returnss.sort(
        (a, b) =>
          new Date(b.ReturnDate).getTime() - new Date(a.ReturnDate).getTime()
      );

      if (!returns || returns.length === 0) {
        return Response.success(
          [],
          "İade bulunamadı",
          HttpStatus.NOT_FOUND
        ) as any;
      }

      const productIds = [...new Set(returns.map((r) => r.ProductID))];
      const products = await this.productRepository.getProductsByIds(
        "ProductID",
        productIds,
        { ProductID: true, ProductName: true, SalePrice: true, StockType: true }
      );

      if (type === "customer") {
        const clientIds = [
          ...new Set(
            returns.map((r) => r.ClientID).filter((id) => id !== null)
          ),
        ];
        const clients = await this.customerRepository.getClientsByIds(
          "ClientID",
          clientIds,
          { ClientName: true, ClientID: true, ClientSurname: true }
        );

        const returnDtos = returns.map((r) => ({
          ProductID: r.ProductID,
          ProductName:
            products.find((p) => p.ProductID === r.ProductID)?.ProductName ||
            "",
          SalePrice:
            products.find((p) => p.ProductID === r.ProductID)?.SalePrice || 0,
          ReturnDate: r.ReturnDate,
          StockType:
            products.find((p) => p.ProductID === r.ProductID)?.StockType || "",
          ClientID: r.ClientID,
          ClientName:
            clients.find((c) => c.ClientID === r.ClientID)?.ClientName || "",
          ClientSurname:
            clients.find((c) => c.ClientID === r.ClientID)?.ClientSurname || "",
          Quantity: r.Quantity,
        }));

        return Response.success(
          returnDtos,
          "İadeler başarıyla getirildi",
          HttpStatus.OK
        ) as any;
      } else {
        const supplierIds = [
          ...new Set(
            returns.map((r) => r.SupplierID).filter((id) => id !== null)
          ),
        ];
        const suppliers = await this.supplierRepository.getClientsByIds(
          "SupplierID",
          supplierIds,
          { SupplierName: true, SupplierID: true, SupplierSurname: true }
        );

        const returnDtos = returns.map((r) => ({
          ProductID: r.ProductID,
          ProductName:
            products.find((p) => p.ProductID === r.ProductID)?.ProductName ||
            "",
          SalePrice:
            products.find((p) => p.ProductID === r.ProductID)?.SalePrice || 0,
          StockType:
            products.find((p) => p.ProductID === r.ProductID)?.StockType || "",
          ReturnDate: r.ReturnDate,
          Quantity: r.Quantity,

          SupplierID: r.SupplierID,
          SupplierName:
            suppliers.find((s) => s.SupplierID === r.SupplierID)
              ?.SupplierName || "",
          SupplierSurname:
            suppliers.find((s) => s.SupplierID === r.SupplierID)
              ?.SupplierSurname || "",
        }));

        return Response.success(
          returnDtos,
          "İadeler başarıyla getirildi",
          HttpStatus.OK
        ) as any;
      }
    } catch (error) {
      console.error("İadeler getirilirken hata:", error);
      return Response.failure(
        "İadeler getirilirken hata oluştu",
        [],
        HttpStatus.INTERNAL_SERVER_ERROR
      ) as any;
    }
  }
}
