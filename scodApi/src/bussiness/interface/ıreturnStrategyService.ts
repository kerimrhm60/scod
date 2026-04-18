import { PrismaClient } from "@prisma/client";


export interface IReturnStrategyService{
    updateStock(productId: number, quantity: number, tx: PrismaClient): Promise<void>;
}