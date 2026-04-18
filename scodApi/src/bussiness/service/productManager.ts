import {
  CreateProductDto,
  UpdateProductDto,
} from "../../dtos/product/productDto";
import {
  ProductEditDto,
  ProductResponseDto,
} from "../../dtos/product/productResponseDto";
import { ProductRepository } from "../../repository/prisma/productrepository";
import { HttpStatus, Response } from "../../response/response";
import { IProductService } from "../interface/ıproductService";

export class ProductManager implements IProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async createProduct(
    request: CreateProductDto
  ): Promise<Response<boolean>> {
    try {
      await this.productRepository.create({
        ProductName: request.ProductName,
        BarcodeNumber: request.BarcodeNumber,
        Description: request.Description ?? null,
        SalePrice: request.SalePrice,
        PurchasePrice: request.PurchasePrice,
        Stok_Quantity: request.Stok_Quantity,
        SupplierID: request.SupplierID ?? null,
        Created_At: request.Created_At,
        Update_At: request.Update_At,
        StockType: request.StockType,
        UserID: request.UserID,
      });

      return Response.success<boolean>(
        true,
        "Ürün başarıyla oluşturuldu",
        HttpStatus.CREATED
      );
    } catch (error) {
      console.error("Ürün oluşturulurken hata:", error);
      return Response.failure<boolean>(
        "Ürün oluşturulamadı",
        false,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  public async getProdcutList(
    userId: number
  ): Promise<Response<ProductResponseDto[]>> {
    try {
      const products = await this.productRepository.getManyQueryable(
        (q: any) => ({
          UserID: userId,
        })
      );

      if (!products || products.length === 0) {
        return Response.success<ProductResponseDto[]>(
          [],
          "Kullanıcıya ait ürün bulunamadı",
          HttpStatus.NOT_FOUND
        );
      }

      const productDtos: ProductResponseDto[] = products.map((product) => ({
        ProductID: product.ProductID,
        ProductName: product.ProductName,
        SalePrice: product.SalePrice,
        PurchasePrice: product.PurchasePrice,
        Stok_Quantity: product.Stok_Quantity,
      }));

      return Response.success<ProductResponseDto[]>(
        productDtos,
        "Ürünler başarıyla getirildi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Ürünler getirilirken hata:", error);
      return Response.failure<ProductResponseDto[]>(
        "Ürünler getirilirken hata oluştu",
        [],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  public async getProductByBarcode(
    barcodeNumber?: string
  ): Promise<Response<ProductResponseDto | null>> {
    try {
      if (!barcodeNumber) {
        return Response.failure<ProductResponseDto | null>(
          "Barkod numarası gerekli",
          null,
          HttpStatus.BAD_REQUEST
        );
      }
      const product = await this.productRepository.getQueryablee((q: any) => ({
        BarcodeNumber: barcodeNumber,
      }));

      if (!product) {
        return Response.success<ProductResponseDto | null>(
          null,
          "Barkod numarasına veya ürün adına ait ürün bulunamadı",
          HttpStatus.NOT_FOUND
        );
      }

      const productDto: ProductResponseDto = {
        ProductID: product.ProductID,
        ProductName: product.ProductName,
        SalePrice: product.SalePrice,
        PurchasePrice: product.PurchasePrice,
        Stok_Quantity: product.Stok_Quantity,
      };

      return Response.success<ProductResponseDto>(
        productDto,
        "Ürün başarıyla getirildi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Ürün getirilirken hata:", error);
      return Response.failure<ProductResponseDto | null>(
        "Ürün getirilirken hata oluştu",
        null,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  public async getProdcutNameList(
    request: string
  ): Promise<Response<ProductResponseDto[]>> {
    try {
      const products = await this.productRepository.getManyQueryable(
        (q: any) => ({
          ProductName: { contains: request, mode: "insensitive" },
        })
      );

      if (!products || products.length === 0) {
        return Response.success<ProductResponseDto[]>(
          [],
          "Kullanıcıya ait ürün bulunamadı",
          HttpStatus.NOT_FOUND
        );
      }

      const productDtos: ProductResponseDto[] = products.map((product) => ({
        ProductID: product.ProductID,
        ProductName: product.ProductName,
        SalePrice: product.SalePrice,
        PurchasePrice: product.PurchasePrice,
        Stok_Quantity: product.Stok_Quantity,
      }));

      return Response.success<ProductResponseDto[]>(
        productDtos,
        "Ürünler başarıyla getirildi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Ürünler getirilirken hata:", error);
      return Response.failure<ProductResponseDto[]>(
        "Ürünler getirilirken hata oluştu",
        [],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getProductById(
    productId: number
  ): Promise<Response<ProductEditDto>> {
    try {
      const product = await this.productRepository.getQueryablee((q: any) => ({
        ProductID: productId,
      }));

      if (!product) {
        return Response.failure<ProductEditDto>(
          "Ürün bulunamadı",
          undefined,
          HttpStatus.NOT_FOUND
        );
      }

      const productDto: ProductEditDto = {
        ProductName: product.ProductName,
        BarcodeNumber: product.BarcodeNumber,
        PurchasePrice: product.PurchasePrice,
        Description: product.Description ?? undefined,
        SalePrice: product.SalePrice,
        Stok_Quantity: product.Stok_Quantity,
        StockType: product.StockType,
        Update_At : product.Update_At,
      };

      return Response.success<ProductEditDto>(
        productDto,
        "Ürün başarıyla getirildi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Ürün getirilirken hata:", error);
      return Response.failure<ProductEditDto>(
        "Ürün getirilirken hata oluştu",
        undefined,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  public async updateProduct(
    request: UpdateProductDto
  ): Promise<Response<boolean>> {
    try {
      const product = await this.productRepository.getQueryablee((q: any) => ({
        ProductID: request.ProductID,
      }));
      if (!product) {
        return Response.failure<boolean>(
          "Güncellenecek ürün bulunamadı",
          false,
          HttpStatus.NOT_FOUND
        );
      }
      await this.productRepository.update('ProductID', request.ProductID, {
        ProductName: request.ProductName,
        BarcodeNumber: request.BarcodeNumber,
        Description: request.Description ?? null,
        SalePrice: request.SalePrice,
        PurchasePrice: request.PurchasePrice,
        Stok_Quantity: request.Stok_Quantity,
        Update_At: request.Update_At,
        StockType: request.StockType,
      });
      return Response.success<boolean>(
        true,
        "Ürün başarıyla güncellendi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Ürün güncellenirken hata:", error);
      return Response.failure<boolean>(
        "Ürün güncellenirken bir hata oluştu",
        false,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
