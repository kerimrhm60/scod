import CustomerDbManager from "../../database/customerDbManager";
import { CustomerFields, GetCustomerListFields, GetDetailCustomerListFields } from "../../types/comesandgoes";
export declare class CustomerManager<T> {
    request: T;
    customerDbManager: CustomerDbManager;
    constructor(request: T);
    createCustomer: (customerData: CustomerFields) => Promise<any>;
    getCustomerList: (getCustomerList: GetCustomerListFields) => Promise<any>;
    cashReceivableList: (getCustomerList: GetCustomerListFields) => Promise<any>;
    debCustomerList: (getCustomerList: GetCustomerListFields) => Promise<any>;
    getMoneyTransfers: (getCustomerList: GetCustomerListFields) => Promise<any>;
    getCombinedCustomerData: (getCustomerList: GetCustomerListFields) => Promise<{
        success: boolean;
        data?: any;
        message?: string;
    }>;
    getCombinedDetailCustomerData: (getCustomerList: GetDetailCustomerListFields) => Promise<{
        success: boolean;
        data?: any;
        message?: string;
    }>;
}
