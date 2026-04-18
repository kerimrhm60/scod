// src/repository/prisma/base.repository.ts
import { PrismaClient } from "@prisma/client";
import { IRepository } from "../interface/irepository";

export class BasePrismaRepository<T> implements IRepository<T> {
  protected client: PrismaClient;
  protected model: any;

  constructor(client: PrismaClient, model: any) {
    this.client = client;
    this.model = model;
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create({ data });
  }

  // async update(id: number, data: Partial<T>): Promise<T> {
  //   return this.model.update({ where: { id }, data });
  // }

  async update<K extends keyof T>(
    idField: K,
    idValue: T[K],
    data: Partial<T>
  ): Promise<T> {
    return this.model.update({
      where: { [idField]: idValue },
      data,
    });
  }

  async delete(id: number): Promise<T> {
    return this.model.delete({ where: { id } });
  }
  async getQueryablee(filter?: (query: any) => any): Promise<T | null> {
    const query = filter ? filter({}) : {};
    return this.model.findFirst({
      where: query,
    });
  }

  async getManyQueryable(filter?: (query: any) => any): Promise<T[]> {
    const query = filter ? filter({}) : {};
    return this.model.findMany({
      where: query,
    });
  }

  async getWithRelationsByUserId<
    T extends Record<string, any>, // 1. Fonksiyonun döndüreceği temel model tipi. Herhangi bir obje olabilir.
    RelationModel extends Record<string, any>, // 2. İlişkili model tipi. Yani ilişki ile çekilecek modelin tipi.
    K extends keyof RelationModel, // 3. İlişkili modelden seçilecek alanların anahtarları (field isimleri).
  >(
    userId: number, // 4. İlgili kullanıcının ID'si, sorguda filtre için kullanılır.
    relationOptions: {
      // 5. İlişki için opsiyonlar nesnesi:
      relationName: string; // 6. İlişki ismi (örn: "profile", "posts", "orders" gibi)
      selectFields: K[]; // 7. İlişkili modelden seçilecek alanların dizisi (örn: ['id', 'name'])
      where?: Record<string, any>; // 8. Opsiyonel: ilişkili modele uygulanacak ekstra filtreler (WHERE koşulları)
    }
  ): Promise<
    Array<
      T & {
        // 9. Dönen dizi içindeki her obje, temel model (T) +
        [key in typeof relationOptions.relationName]: Pick<RelationModel, K>;
        // 10. İlişkili modelin relationName alanı altında selectFields ile seçilen alanları içeren obje olacak.
      }
    >
  > {
    const selectObj: { [key in K]: true } = {} as { [key in K]: true };
    // 11. selectObj adında boş bir nesne oluşturuyoruz. Anahtarlar K (alan isimleri) ve değerleri true olacak.
    // Bu, Prisma gibi ORM'lerde 'select' için kullanılır.

    relationOptions.selectFields.forEach((field) => {
      selectObj[field] = true;
      // 12. selectFields içindeki her alanı true yaparak selectObj içine ekliyoruz.
    });

    return this.model.findMany({
      // 13. Veritabanından birden fazla kayıt getiren async sorguyu başlatıyoruz.

      where: {
        UserID: userId,
        // 14. Temel filtre: modelin UserID alanı parametre userId ile eşleşmeli
        ...(relationOptions.where || {}),
        // 15. Opsiyonel ilişkili model filtresi varsa onu da buraya ekliyoruz.
      },

      include: {
        // 16. İlişkili modeli de dahil etmek için 'include' kullanıyoruz.

        [relationOptions.relationName]: {
          // 17. İlişkili modelin ismi dinamik olarak belirleniyor.

          select: selectObj,
          // 18. İlişkili model için sadece belirlenen alanları (selectObj) seçiyoruz.
        },
      },
    });
  }


  
  async decrementField<K extends keyof T>(
    idField: K,
    idValue: T[K],
    fieldToDecrement: keyof T,
    amount: number
  ): Promise<void> {
    await this.model.update({
      where: { [idField]: idValue },
      data: {
        [fieldToDecrement]: {
          decrement: amount,
        },
      },
    });
  }

  async incrementField<K extends keyof T>(
    idField: K,
    idValue: T[K],
    fieldToIncrement: keyof T,
    amount: number
  ): Promise<void> {
    await this.model.update({
      where: { [idField]: idValue },
      data: {
        [fieldToIncrement]: {
          increment: amount,
        },
      },
    });
  }
}
