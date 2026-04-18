export interface ProductResponseDto {
    ProductID:number;
    ProductName: string;
    SalePrice: number;
    PurchasePrice: number;
    Stok_Quantity: number;
  }

  export interface ProductEditDto {
    ProductName: string;
    BarcodeNumber: string;
    Description?: string;
    SalePrice: number;
    PurchasePrice: number;
    Stok_Quantity: number;
    StockType: string;
    Update_At:Date;
  }
