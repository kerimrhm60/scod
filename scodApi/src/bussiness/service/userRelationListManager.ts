import { HttpStatus, Response } from "../../response/response";

export async function getUserRelatedList<
  TEntity,          // repository'den dönen ham entity tipi
  TRelation,        // relation objesi tipi
  TDto              // dışarıya döneceğimiz DTO tipi
>(
  userId: number,
  repository: {
    getWithRelationsByUserId: <E, R, K extends keyof R>(
      userId: number,
      options: { relationName: string; selectFields: readonly K[] }
    ) => Promise<(E & { [P in K]: R[P] })[]>;
  },
  relationName: string,
  selectFields: (keyof TRelation)[],
  mapFn: (entity: TEntity & { [key: string]: any }) => TDto
): Promise<Response<TDto[]>> {
  try {
    const list = await repository.getWithRelationsByUserId<TEntity, TRelation, keyof TRelation>(
      userId,
      { relationName, selectFields }
    );

    if (!list || list.length === 0) {
      return Response.success<TDto[]>([], "Kullanıcıya ait veri bulunamadı", HttpStatus.NOT_FOUND);
    }

    const dtos = list.map(mapFn);

    return Response.success<TDto[]>(dtos, "Veri başarıyla getirildi", HttpStatus.OK);
  } catch (error) {
    console.error("Veri getirilirken hata:", error);
    return Response.failure<TDto[]>("Veri getirilirken hata oluştu", [], HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
