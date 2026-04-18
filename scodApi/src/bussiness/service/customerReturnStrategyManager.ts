import { PrismaClient, Product } from "@prisma/client";
import { BasePrismaRepository } from "../../repository/prisma/baserepository";
import { IReturnStrategyService } from "../interface/ıreturnStrategyService";


export class CustomerReturnStrategy  implements IReturnStrategyService{
  constructor(private productRepo: BasePrismaRepository<Product>) {}

  async updateStock(productId: number, quantity: number, tx: PrismaClient) {
    await this.productRepo.incrementField("ProductID", productId, "Stok_Quantity", quantity, tx);
  }
}