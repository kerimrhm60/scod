import { SuplierDBManager } from "../../database/dbManager/suplierDBManager";
import { SuplierDto } from "../../dtos/suplier/suplierDto";
import { SuplierResponseDto } from "../../dtos/suplier/suplierResponseDto";
import { SuplierRepository } from "../../repository/prisma/suplierrepository";
import { HttpStatus, Response } from "../../response/response";

import { ISuplierService } from "../interface/ısuplierService";

export class SuplierManager implements ISuplierService {
  private suplierRepository: SuplierRepository;
  constructor() {
    this.suplierRepository = new SuplierRepository();
  }

  public async suplierList(
    userId: number
  ): Promise<Response<SuplierResponseDto[]>> {
    try {
      const supliers = await this.suplierRepository.getManyQueryable(
        (q: any) => ({
          UserID: userId,
        })
      );

      if (!supliers || supliers.length === 0) {
        return Response.success<SuplierResponseDto[]>(
          [],
          "Kullanıcıya ait tedarikçi bulunamadı",
          HttpStatus.NOT_FOUND
        );
      }

      const suplierDtos: SuplierResponseDto[] = supliers.map((suplier) => ({
        SupplierID: suplier.SupplierID,
        SupplierName: suplier.SupplierName,
        SupplierSurname: suplier.SupplierSurname,
      }));

      return Response.success<SuplierResponseDto[]>(
        suplierDtos,
        "Tedarikçiler başarıylagetirildi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Tedarikçiler getirilirken hata:", error);
      return Response.failure<SuplierResponseDto[]>(
        "Tedarikçiler getirilirken hata oluştu",
        [],
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async createSupplier(request: SuplierDto): Promise<Response<boolean>> {
    try {
      await this.suplierRepository.create({
        SupplierName: request.SupplierName,
        SupplierSurname: request.SupplierSurname,
        Phone: request.Phone,
        Address: request.Address,
        UserID:request.UserID,
        Created_At: new Date(),
        Update_At: new Date(),
      });

      return Response.success<boolean>(
        true,
        "Tedarikçi kaydı başarıyla oluşturuldu",
        HttpStatus.CREATED
      );
    } catch (error) {
      console.error("tedarikçi kaydı oluşturuluırken hata:", error);
      return Response.failure<boolean>(
        "Tedarikçi kaydı oluşturulamadı",
        false,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
