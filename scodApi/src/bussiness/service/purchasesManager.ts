import { PurchaseResponseDto } from "../../dtos/purchases/purchaseResponseDto";
import { CreatePurchaseDto } from "../../dtos/purchases/purchases";
import { SaleTotalAmountDto } from "../../dtos/sale/saleResponseDto";
import { ProductRepository } from "../../repository/prisma/productrepository";
import { PurchasesRepository } from "../../repository/prisma/purchasesrepository";
import { HttpStatus, Response } from "../../response/response";
import { IPurchasesService } from "../interface/ıpurchaseService";

export class PurchasesManager implements IPurchasesService {
  private purchasesRepository: PurchasesRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.purchasesRepository = new PurchasesRepository();
    this.productRepository = new ProductRepository();
  }
  public async createPurchase(
    request: CreatePurchaseDto | CreatePurchaseDto[]
  ): Promise<Response<boolean>> {
    try {
      if (Array.isArray(request)) {
        const purchasesToCreate = request.map((purchase) => ({
          ProductID: purchase.ProductID,
          Purchase_date: purchase.Purchase_date,
          UserID: purchase.UserID,
          Total_amount: purchase.Total_amount,
          SupplierID: purchase.SupplierID,
          Quantity: purchase.Quantity,
        }));

        await this.purchasesRepository.createMany(purchasesToCreate);

        // Stokları arttır
        for (const purchase of request) {
          await this.productRepository.incrementField(
            "ProductID",
            purchase.ProductID,
            "Stok_Quantity",
            purchase.Quantity
          );
        }
      } else {
        await this.purchasesRepository.create({
          ProductID: request.ProductID,
          Purchase_date: request.Purchase_date,
          UserID: request.UserID,
          SupplierID: request.SupplierID,
          Total_amount: request.Total_amount,
          Quantity: request.Quantity,
        });

        // Tekli satın alımda stok artır
        await this.productRepository.incrementField(
          "ProductID",
          request.ProductID,
          "Stok_Quantity",
          request.Quantity
        );
      }

      return Response.success<boolean>(
        true,
        "İşlem başarıyla gerçekleştirildi",
        HttpStatus.CREATED
      );
    } catch (error) {
      console.error("Satın alım oluşturulurken hata:", error);
      return Response.failure<boolean>(
        "Satın alım oluşturulamadı",
        false,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async purchaseList(
    userId: number
  ): Promise<Response<PurchaseResponseDto[]>> {
    try {
      const purchasess = await this.purchasesRepository.getManyQueryable(
        (q) => ({ UserID: userId })
      );
      if (!purchasess || purchasess.length === 0) {
        return Response.success(
          [],
          "Alış kaydı bulunamadı",
          HttpStatus.NOT_FOUND
        ) as any;
      }

      const productIds = [...new Set(purchasess.map((r) => r.ProductID))];
      const products = await this.productRepository.getProductsByIds(
        "ProductID",
        productIds,
        {
          ProductID: true,
          ProductName: true,
          SalePrice: true,
          StockType: true,
        }
      );

      const returnDtos = purchasess.map((r) => ({
        ProductID: r.ProductID,
        ProductName:
          products.find((p) => p.ProductID === r.ProductID)?.ProductName || "",
        SalePrice:
          products.find((p) => p.ProductID === r.ProductID)?.SalePrice || 0,
        StockType:
          products.find((p) => p.ProductID === r.ProductID)?.StockType || "",
        Purchase_date: r.Purchase_date,
        Quantity: r.Quantity,
      }));

      return Response.success<PurchaseResponseDto[]>(
        returnDtos,
        "Alışlar başarıyla getirildi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Alışlar getirilirken hata:", error);
      return Response.failure<PurchaseResponseDto[]>(
        "Alışlar getirilirken hata oluştu",
        [],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  public async purchaseTotalAmount(
    userId: number
  ): Promise<Response<SaleTotalAmountDto>> {
    try {
      const purchase = await this.purchasesRepository.getManyQueryable(
        (q: any) => ({
          UserID: userId,
        })
      );

      if (!purchase || purchase.length === 0) {
        return Response.success<SaleTotalAmountDto>(
          undefined,
          "Kullanıcıya ait satış bulunamadı",
          HttpStatus.NOT_FOUND
        );
      }

      const total = purchase.reduce(
        (sum, purchase) => sum + (purchase.Total_amount || 0),
        0
      );

      const dto: SaleTotalAmountDto = {
        TotalAmount: total,
      };

      return Response.success<SaleTotalAmountDto>(
        dto,
        "Toplam alış tutarı başarıyla getirildi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Toplam alış tutarı getirilirken hata:", error);
      return Response.failure<SaleTotalAmountDto>(
        "Toplam alış tutarı getirilirken hata oluştu",
        undefined,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
