import { Response } from "../../response/response";
import {  SuplierResponseDto } from "../../dtos/suplier/suplierResponseDto";
import { SuplierDto } from "../../dtos/suplier/suplierDto";

export interface ISuplierService {
  createSupplier(request: SuplierDto): Promise<Response<boolean>>;

  suplierList(userId: number): Promise<Response<SuplierResponseDto[]>>;
}
