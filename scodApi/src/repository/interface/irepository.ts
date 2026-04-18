import { PrismaClient } from "@prisma/client";

export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  // update(id: number, data: Partial<T>): Promise<T>;
  update<K extends keyof T>(
    idField: K,
    idValue: T[K],
    data: Partial<T>
  ): Promise<T>;

  delete(id: number): Promise<T>;
  getQueryablee?(filter?: (query: any) => any): Promise<T | null>;
  getManyQueryable?(filter?: (query: any) => any): Promise<T[]>;


  decrementField?(
    idField: keyof T,
    idValue: T[keyof T],
    fieldToDecrement: keyof T,
    amount: number
  ): Promise<void>;

  incrementField?(
    idField: keyof T,
    idValue: T[keyof T],
    fieldToIncrement: keyof T,
    amount: number
  ): Promise<void>;
}
