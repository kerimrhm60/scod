import { Exception } from "./exception";
export declare class BusinessException extends Exception {
    isError: boolean;
    constructor(message: string, status: number);
}
