import Joi from "joi";
import { Request, Response, NextFunction } from "express";
export declare function requestValidator(schema: Joi.ObjectSchema<any>, options?: Joi.ValidationOptions): (req: Request, res: Response, next: NextFunction) => Promise<void>;
