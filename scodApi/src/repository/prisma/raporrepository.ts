import prisma from "../../../prisma/client";
import { CreateProductDto } from "../../dtos/product/productDto";
import { BasePrismaRepository } from "./baserepository";
import { Product, Sale } from "@prisma/client";
import { HttpStatus, Response } from "../../response/response";
import { PrismaClient, Prisma } from "@prisma/client";
import { SaleWithProductDto } from "../../dtos/sale/saleWithProductDto";

export class RaporRepository extends BasePrismaRepository<Sale> {
  constructor() {
    super(prisma, prisma.sale);
  }


  public async getSalesWithProductByUserId(userId: number): Promise<SaleWithProductDto[]> {
    return await this.model.findMany({
      where: { UserID: userId },
      include: {
        product: {
          select: {
            ProductName: true,
            SalePrice: true,
          },
        },
      },
    });
  }
}
