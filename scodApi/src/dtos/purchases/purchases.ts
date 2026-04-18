export interface CreatePurchaseDto {
  UserID:number;
  Purchase_date: Date;
  ProductID:number;
  SupplierID:number;
  Total_amount: number;
  Quantity: number;
}

export interface UpdatePurchaseDto {
  ProductID?: number;
  Purchase_date?: Date;
  TotalAmount?: number;
}
