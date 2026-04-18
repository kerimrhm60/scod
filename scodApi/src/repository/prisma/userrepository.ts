import prisma from "../../../prisma/client";
import { User } from "@prisma/client";
import { BasePrismaRepository } from "./baserepository";
import { HttpStatus, Response } from "../../response/response";
import { RegisterUserDto } from "../../dtos/user/registerResponseDto";

export class UserRepository extends BasePrismaRepository<User> {
  constructor() {
    super(prisma, prisma.user);
  }
}
