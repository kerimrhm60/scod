import prisma from "../../../prisma/client";
import { CreateProductDto } from "../../dtos/product/productDto";
import { BasePrismaRepository } from "./baserepository";
import { Product, Sale } from "@prisma/client";
import { HttpStatus, Response } from "../../response/response";
import { PrismaClient, Prisma } from "@prisma/client";
import { SaleWithProductDto } from "../../dtos/sale/saleWithProductDto";

export class SaleRepository extends BasePrismaRepository<Sale> {
  constructor() {
    super(prisma, prisma.sale);
  }

  public async createMany(sales: Prisma.SaleCreateManyInput[]): Promise<void> {
    await prisma.sale.createMany({ data: sales });
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

    public async getSaleProductByIds(
      fieldName: keyof Sale,
      values: (string | number)[],
      selectFields?: Partial<Record<keyof Sale, boolean>>
    ): Promise<Sale[]> {
      return this.model.findMany({
        where: {
          [fieldName]: { in: values },
        },
        select: selectFields,
      });
    }
}
