import joi from "joi";
import { MultilanguageDefinitionType } from "../../types/multilanguage/multilanguageDefinitionType";
import { MultilanguageGetType } from "../../types/multilanguage/multilanguageGetType";
export declare const CreateSchema: joi.ObjectSchema<MultilanguageDefinitionType>;
export declare const GetMlWordsSchema: joi.ObjectSchema<MultilanguageGetType>;
