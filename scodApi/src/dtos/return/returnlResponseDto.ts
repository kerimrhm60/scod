export interface ReturnTotalResponseDto {
  saleReturnTotal: number;
  purchaseReturnTotal: number;
}
export interface ReturnResponseDto {
  ProductID: number;
  ProductName: string;
  SalePrice: number;
  ReturnDate: Date;
  ClientID: number | null;
  ClientName:string;
  ClientSurname:string;
}
export interface ReturnSupplierResponseDto {
  ProductID: number;
  ProductName: string;
  SalePrice: number;
  ReturnDate: Date;
  SupplierID: number | null;
  SupplierName: string;
  SupplierSurname: string;
}
