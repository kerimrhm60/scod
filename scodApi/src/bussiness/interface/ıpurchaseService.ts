import { PurchaseResponseDto } from "../../dtos/purchases/purchaseResponseDto";
import { CreatePurchaseDto } from "../../dtos/purchases/purchases";
import { SaleResponseDto, SaleTotalAmountDto } from "../../dtos/sale/saleResponseDto";
import { Response } from "../../response/response";

export interface IPurchasesService {
  createPurchase(request: CreatePurchaseDto): Promise<Response<boolean>>;
  purchaseList(userId: number): Promise<Response<PurchaseResponseDto[]>>;
  purchaseTotalAmount(userId: number): Promise<Response<SaleTotalAmountDto>>;
}
