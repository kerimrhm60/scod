
import { UserRegisterFields } from "../../types/type/authType";
import { User } from "@prisma/client";
import { Response } from "../../response/response";
import { RegisterUserDto } from "../../dtos/user/registerResponseDto";
import { LoginResponseDto } from "../../dtos/user/loginResponseDto";
import { LoginDto } from "../../dtos/user/loginDto";
import { UserListDto } from "../../dtos/user/userListDto";

export interface IUserService {
  login(userData: LoginDto): Promise<Response<LoginResponseDto>>;
  register(userData: RegisterUserDto): Promise<Response<boolean>>;
  userList(request:number): Promise<Response<UserListDto[]>>;
}
