export interface PurchaseResponseDto {
  ProductID: number;
  ProductName: string;
  SalePrice: number;
  Purchase_date: Date;
}
export interface PurchaseTotalAmountDto {
  TotalAmount: number;
}