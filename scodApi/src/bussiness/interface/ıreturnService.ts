import { CreateReturnDto } from "../../dtos/return/return";
import {  ReturnResponseDto, ReturnSupplierResponseDto, ReturnTotalResponseDto } from "../../dtos/return/returnlResponseDto";
import { Response } from "../../response/response";

export interface IReturnService {
  createReturn(request: CreateReturnDto): Promise<Response<boolean>>;
  // returnList(userId: number): Promise<Response<ReturnResponseDto[]>>;
   returnList<T extends 'customer' | 'supplier'>(
    userId: number,
    type: T
  ): Promise<Response<
    T extends 'customer' ? ReturnResponseDto[] : ReturnSupplierResponseDto[]
  >>;
  // returnSupplierList(userId: number): Promise<Response<ReturnSupplierResponseDto[]>>;

  returnTotalAmount(userId: number): Promise<Response<ReturnTotalResponseDto>>;
}
