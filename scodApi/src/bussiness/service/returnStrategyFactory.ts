import { Product } from "@prisma/client";
import { BasePrismaRepository } from "../../repository/prisma/baserepository";
import { IReturnStrategyService } from "../interface/ıreturnStrategyService";
import { SupplierReturnStrategy } from "./suplierReturnStrategy.Manager";
import { CustomerReturnStrategy } from "./customerReturnStrategyManager";

export class ReturnStrategyFactory {
  static getStrategy(returnType: string, productRepo: BasePrismaRepository<Product>): IReturnStrategyService {
    switch(returnType) {
      case "supplier":
        return new SupplierReturnStrategy(productRepo);
      case "customer":
        return new CustomerReturnStrategy(productRepo);
      default:
        throw new Error("Geçersiz returnType");
    }
  }
}