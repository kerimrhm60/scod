import AccountDbManager from "../../database/acountDbManager";
import { AccountFields, ActiveUsersListFields, DebtFields, InactiveUsersListFields, TransferManyFields, UserCashFields } from "../../types/comesandgoes";
export declare class AccountManager<T> {
    request: T;
    accountDbManager: AccountDbManager;
    constructor(request: T);
    createAccount: (accountData: AccountFields) => Promise<any>;
    createtransferMany: (transfermanyData: TransferManyFields) => Promise<any>;
    createDebt: (debtData: DebtFields) => Promise<any>;
    createcashReceivable: (debtData: DebtFields) => Promise<any>;
    createUserCah: (userCashData: UserCashFields) => Promise<any>;
    getInactiveUsers: (userId: InactiveUsersListFields) => Promise<any>;
    activateUser: (userId: ActiveUsersListFields) => Promise<any>;
    getUserCashAmount: (userId: number) => Promise<any>;
    getUserFinancialSummary: (userId: number) => Promise<{
        totalCash: number;
        totalDebt: number;
    }>;
    getUserTotalDebt: (userId: number) => Promise<any>;
    getAccountIınfo: (userId: number) => Promise<any>;
}
