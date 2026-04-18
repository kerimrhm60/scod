import { AccountFields, ActiveUsersListFields, DebtFields, InactiveUsersListFields, TransferManyFields, UserCashFields } from "../types/comesandgoes";
export declare class AccountDbManager {
    createAccount: (accountData: AccountFields) => Promise<any>;
    createtransferMany: (transferManyData: TransferManyFields) => Promise<any>;
    createDebt: (debtData: DebtFields) => Promise<any>;
    createcashReceivable: (debtData: DebtFields) => Promise<any>;
    createUserCash: (userCashData: UserCashFields) => Promise<any>;
    getInactiveUsers: (userId: InactiveUsersListFields) => Promise<any>;
    getUserCashAmount: (userId: number) => Promise<any>;
    getUserTotalDebt: (userId: number) => Promise<any>;
    getUserFinancialSummary: (userId: number) => Promise<{
        totalCash: number;
        totalDebt: number;
    }>;
    activateUser: (userId: ActiveUsersListFields) => Promise<any>;
    getAccountIınfo: (userId: number) => Promise<any>;
}
export default AccountDbManager;
