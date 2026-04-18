import prisma from "../../../prisma/client";
import { BasePrismaRepository } from "./baserepository";
import { Supplier } from "@prisma/client";

export class SuplierRepository extends BasePrismaRepository<Supplier> {
  constructor() {
    super(prisma, prisma.supplier);
  }

  public async getClientsByIds(
    fieldName: keyof Supplier,
    values: (string | number)[],
    selectFields?: Partial<Record<keyof Supplier, boolean>>
  ): Promise<Supplier[]> {
    return this.model.findMany({
      where: {
        [fieldName]: { in: values },
      },
      select: selectFields,
    });
  }
}
