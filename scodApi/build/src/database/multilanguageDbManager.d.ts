import { MultilanguageDefinitionType } from "../types/multilanguage/multilanguageDefinitionType";
import { MultilanguageGetType } from "../types/multilanguage/multilanguageGetType";
export declare class MultilanguageDbManager {
    addMultilanguage: (mlDef: MultilanguageDefinitionType) => Promise<any>;
    getMultilanguageValue: (req: MultilanguageGetType) => Promise<any>;
}
