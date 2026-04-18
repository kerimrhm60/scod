import { CreateSaleDto, UpdateSaleDto } from "../../dtos/sale/saleDto";
import {
  SaleResponseDto,
  SaleTotalAmountDto,
} from "../../dtos/sale/saleResponseDto";
import { Response } from "../../response/response";

export interface ISaleService {
  createSale(request: CreateSaleDto): Promise<Response<boolean>>;
  saleList(userId: number): Promise<Response<SaleResponseDto[]>>;
  saleTotalAmount(userId: number): Promise<Response<SaleTotalAmountDto>>;
  
  saleTotalList<T extends "standard" | "debt" | "all">(
    userId: number,
    type: T
  ): Promise<Response<SaleResponseDto[]>>;
  updateSale(request: UpdateSaleDto): Promise<Response<boolean>>;
}
