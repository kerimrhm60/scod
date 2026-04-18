import { UserRegisterFields } from "../../types/type/authType";
import { User } from "@prisma/client";
import { Response } from "../../response/response";
import { RegisterUserDto } from "../../dtos/user/registerResponseDto";
import { LoginResponseDto } from "../../dtos/user/loginResponseDto";
import { LoginDto } from "../../dtos/user/loginDto";
import { CreateCustomerDto } from "../../dtos/customer/customerDto";
import { CustomerResponseDto } from "../../dtos/customer/customerResponseDto";

export interface ICustomerService {
  createCustomer(request: CreateCustomerDto): Promise<Response<boolean>>;
  customerList(userId: number): Promise<Response<CustomerResponseDto[]>>;
}
