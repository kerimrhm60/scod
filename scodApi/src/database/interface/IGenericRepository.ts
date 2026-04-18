export interface IGenericRepository<T> {
  getById(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  create(data: Omit<T, 'UserID'>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}



// export interface IGenericRepository<T> {
//   getById(id: string): Promise<T | null>;
//   getAll(pagination?: { skip: number; take: number }): Promise<T[]>;
//   find(filter: Partial<T>, includes?: string[]): Promise<T[]>;
//   create(entity: Omit<T, 'id'>): Promise<T>;
//   update(id: string, entity: Partial<T>): Promise<T>;
//   delete(id: string): Promise<void>;
//   exists(filter: Partial<T>): Promise<boolean>;
// }
