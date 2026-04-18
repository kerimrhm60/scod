import prisma from "../../../prisma/client";
import { CreateProductDto } from "../../dtos/product/productDto";
import { BasePrismaRepository } from "./baserepository";
import { Return } from "@prisma/client";
import { HttpStatus, Response } from "../../response/response";
import { PrismaClient, Prisma } from "@prisma/client";

export class ReturnRepository extends BasePrismaRepository<Return> {
  constructor() {
    super(prisma, prisma.return);
  }

  public async createMany(
    returnData: Prisma.ReturnCreateManyInput[]
  ): Promise<void> {
    await prisma.return.createMany({ data: returnData });
  }
}
