import prisma from "../../../prisma/client";
import { Client, User } from "@prisma/client";
import { BasePrismaRepository } from "./baserepository";

export class CustomerRepository extends BasePrismaRepository<Client> {
  constructor() {
    super(prisma, prisma.client);
  }

  public async getClientsByIds(
    fieldName: keyof Client,
    values: (string | number)[],
    selectFields?: Partial<Record<keyof Client, boolean>>
  ): Promise<Client[]> {
    return this.model.findMany({
      where: {
        [fieldName]: { in: values },
      },
      select: selectFields,
    });
  }
}
