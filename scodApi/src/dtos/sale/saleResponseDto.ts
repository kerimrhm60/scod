export interface SaleResponseDto {
  ProductID: number;
  ProductName: string;
  SalePrice: number;
  SaleDate: Date;
}
export interface SaleTotalAmountDto {
  TotalAmount: number;
  DebtTotal?:number;
}