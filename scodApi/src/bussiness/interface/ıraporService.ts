import { CreateProductDto, UpdateProductDto } from "../../dtos/product/productDto";
import { ProductEditDto, ProductResponseDto } from "../../dtos/product/productResponseDto";
import { RaporResponseDto } from "../../dtos/rapor/rapor";
import { CreateSaleDto } from "../../dtos/sale/saleDto";
import { SaleResponseDto, SaleTotalAmountDto } from "../../dtos/sale/saleResponseDto";
import { Response } from "../../response/response";

export interface IReportService {
  getTotals(userId: number): Promise<Response<RaporResponseDto>>;
}