import { PrismaClient, User } from '@prisma/client';
import { GenericRepository } from './GenericRepository';
import * as bcrypt from 'bcrypt';
import { HttpStatus, Response } from '../../response/response';

export class UserDBManager extends GenericRepository<User> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'user');
  }


}




  // async register(data: Omit<User, 'UserID'>): Promise<User> {
  //   return this.create(data);
  // }