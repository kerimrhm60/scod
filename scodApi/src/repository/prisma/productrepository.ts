import prisma from "../../../prisma/client";
import { CreateProductDto } from "../../dtos/product/productDto";
import { BasePrismaRepository } from "./baserepository";
import { Product } from "@prisma/client";
import { HttpStatus, Response } from "../../response/response";

export class ProductRepository extends BasePrismaRepository<Product> {
  constructor() {
    super(prisma, prisma.product);
  }

  public async getProductsByIds(
    fieldName: keyof Product,
    values: (string | number)[],
    selectFields?: Partial<Record<keyof Product, boolean>>
  ): Promise<Product[]> {
    return this.model.findMany({
      where: {
        [fieldName]: { in: values },
      },
      select: selectFields,
    });
  }

  // public async getProductsByUserId(userId: number): Promise<Product[]> {
  //   return prisma.product.findMany({
  //     where: {
  //       UserID: userId, // Kullanıcıya ait ürünleri filtrele
  //     },
  //   });
  // }
}
