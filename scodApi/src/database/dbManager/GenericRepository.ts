// import { PrismaClient, Prisma } from '@prisma/client';
// import { IGenericRepository } from '../interface/IGenericRepository';

// export class GenericRepository<T extends { id?: string }> implements IGenericRepository<T> {
//   private readonly model: string;
//   private readonly prismaModel: any;

//   constructor(
//     private readonly prisma: PrismaClient,
//     modelName: string
//   ) {
//     this.model = modelName.toLowerCase();
    
//     if (!(this.model in this.prisma)) {
//       throw new Error(`Prisma model '${modelName}' not found`);
//     }
    
//     this.prismaModel = (this.prisma as any)[this.model];
//   }

//   async getById(id: string): Promise<T | null> {
//     return this.prismaModel.findUnique({ where: { id } });
//   }

//   async getAll(pagination?: { skip?: number; take?: number }): Promise<T[]> {
//     return this.prismaModel.findMany({
//       skip: pagination?.skip,
//       take: pagination?.take
//     });
//   }

//   async find(
//     filter: Partial<T>,
//     includes?: string[],
//     pagination?: { skip?: number; take?: number }
//   ): Promise<T[]> {
//     const include = includes?.reduce((acc, relation) => ({
//       ...acc,
//       [relation]: true
//     }), {});

//     return this.prismaModel.findMany({
//       where: filter,
//       include,
//       skip: pagination?.skip,
//       take: pagination?.take
//     });
//   }

//   async create(entity: Omit<T, 'id'>): Promise<T> {
//     return this.prismaModel.create({ data: entity });
//   }

//   async update(id: string, entity: Partial<T>): Promise<T> {
//     return this.prismaModel.update({
//       where: { id },
//       data: entity
//     });
//   }

//   async delete(id: string): Promise<void> {
//     await this.prismaModel.delete({ where: { id } });
//   }

//   async exists(filter: Partial<T>): Promise<boolean> {
//     const count = await this.prismaModel.count({ where: filter });
//     return count > 0;
//   }

//   async count(filter?: Partial<T>): Promise<number> {
//     return this.prismaModel.count({ where: filter });
//   }

//   async executeRaw<T = any>(query: string, parameters?: any[]): Promise<T> {
//     return (this.prisma.$executeRaw as any)(query, parameters);
//   }
// }

import { PrismaClient } from '@prisma/client';
import { IGenericRepository } from '../interface/IGenericRepository';

export class GenericRepository<T extends { UserID?: number }>
  implements IGenericRepository<T> {

  constructor(
    private prisma: PrismaClient,
    private modelName: keyof PrismaClient 
  ) {}

  async getById(id: number): Promise<T | null> {
    return (this.prisma[this.modelName] as any).findUnique({ where: { UserID: id } });
  }

  async getAll(): Promise<T[]> {
    return (this.prisma[this.modelName] as any).findMany();
  }

  async create(data: Omit<T, 'UserID'>): Promise<T> {
    return (this.prisma[this.modelName] as any).create({ data });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return (this.prisma[this.modelName] as any).update({ where: { UserID: id }, data });
  }

  async delete(id: number): Promise<void> {
    await (this.prisma[this.modelName] as any).delete({ where: { UserID: id } });
  }
}