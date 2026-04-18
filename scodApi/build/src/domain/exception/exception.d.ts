export declare class Exception extends Error {
    message: string;
    status: number;
    constructor(message?: string, status?: number);
}
