import prisma from "../../../prisma/client";
import { CreateProductDto } from "../../dtos/product/productDto";
import { BasePrismaRepository } from "./baserepository";
import { Purchases } from "@prisma/client";
import { HttpStatus, Response } from "../../response/response";
import { PrismaClient, Prisma } from "@prisma/client";

export class PurchasesRepository extends BasePrismaRepository<Purchases> {
  constructor() {
    super(prisma, prisma.purchases);
  }
  
  public async createMany(purchases: Prisma.PurchasesCreateManyInput[]): Promise<void> {
    await prisma.purchases.createMany({ data: purchases });
  }
}
