export interface CreateProductDto {
  ProductName: string;
  BarcodeNumber: string;
  Description?: string;
  SalePrice: number;
  PurchasePrice: number;
  Stok_Quantity: number;
  SupplierID?: number;
  Created_At: Date;
  StockType: string;
  Update_At: Date;
  UserID: number;
}
export interface UpdateProductDto {
  ProductID: number;
  ProductName: string;
  BarcodeNumber: string;
  Description?: string;
  SalePrice: number;
  PurchasePrice: number;
  Stok_Quantity: number;
  Created_At: Date;
  StockType: string;
  Update_At: Date;
}
