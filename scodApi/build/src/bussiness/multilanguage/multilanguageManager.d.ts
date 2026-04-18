import { MultilanguageDbManager } from "../../database/multilanguageDbManager";
import { MultilanguageDefinitionType } from "../../types/multilanguage/multilanguageDefinitionType";
export declare class MultilanguageManager {
    request: MultilanguageDefinitionType;
    multilanguageDbManager: MultilanguageDbManager;
    constructor(request: MultilanguageDefinitionType);
    addMultilanguageDefinition: () => Promise<any>;
    getMultilanguageValue: () => Promise<any>;
}
