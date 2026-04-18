export interface CreateSaleDto {
  UserID: number;
  SaleDate: Date;
  SaleType: string;
  ProductID: number;
  ClientID?: number;
  TotalAmount: number;
  Quantity: number;
}

export interface UpdateSaleDto {
  ProductID: number;
  ProductName: string;
  PurchasePrice: number;
  SaleDate: Date;
  SaleID: number;
  SalePrice: number;
  Stok_Quantity: number;
  Quantity: number;
  TotalAmount: number;
  SaleType: string;
  UserID:number

}
