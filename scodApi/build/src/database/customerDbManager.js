"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDbManager = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
class CustomerDbManager {
    constructor() {
        this.createCustomer = (customerData) => __awaiter(this, void 0, void 0, function* () {
            console.log("burası customer backend", customerData);
            try {
                const customer = yield client_1.default.client.create({
                    data: {
                        clientName: customerData.clientName,
                        clientSurname: customerData.clientSurname,
                        clientPhone: customerData.clientPhone,
                        userId: customerData.userId
                    },
                });
                return { success: true, message: "Müşteri Başarıyla oluşturuldu" };
            }
            catch (error) {
                if (error instanceof Error) {
                    return {
                        success: false,
                        message: `Failed to create account: ${error.message}`,
                    };
                }
                else {
                    return {
                        success: false,
                        message: "Failed to create customer due to an unknown error",
                    };
                }
            }
        });
        this.getCustomerList = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            console.log("burası customer backend ", getCustomerList);
            try {
                const customers = yield client_1.default.client.findMany({
                    where: {
                        userId: getCustomerList.userId
                    },
                });
                return customers;
            }
            catch (error) {
                if (error instanceof Error) {
                    return {
                        success: false,
                        message: `Failed to get customers: ${error.message}`,
                    };
                }
            }
        });
        this.cashReceivableList = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            console.log("burası customer backend ", getCustomerList);
            try {
                const receivables = yield client_1.default.cashReceivable.findMany({
                    where: {
                        debtorId: getCustomerList.userId,
                    },
                    include: {
                        creditor: true,
                    },
                });
                return receivables.map((receivable) => ({
                    customerName: receivable.creditor.clientName, // Müşterinin adı
                    customerSurname: receivable.creditor.clientSurname,
                    debtAmount: receivable.debtAmount, // Nakit miktarı
                    debtCurrency: receivable.debtCurrency, // Para birimi
                    debtIssuanceDate: receivable.debtIssuanceDate, // Borç verme tarihi
                    debtRepaymentDate: receivable.debtRepaymentDate, // Geri ödeme tarihi
                }));
            }
            catch (error) {
                if (error instanceof Error) {
                    return {
                        success: false,
                        message: `Failed to get customers: ${error.message}`,
                    };
                }
            }
        });
        this.debCustomerList = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            console.log("burası customer backend ", getCustomerList);
            try {
                const debts = yield client_1.default.debt.findMany({
                    where: {
                        creditorId: getCustomerList.userId,
                    },
                    include: {
                        debtor: true,
                    },
                });
                return debts.map((debt) => ({
                    customerName: debt.debtor.clientName, //
                    customerSurname: debt.debtor.clientSurname,
                    debtAmount: debt.debtAmount,
                    debtCurrency: debt.debtCurrency,
                    debtIssuanceDate: debt.debtIssuanceDate,
                    debtRepaymentDate: debt.debtRepaymentDate,
                }));
            }
            catch (error) {
                if (error instanceof Error) {
                    return {
                        success: false,
                        message: `Failed to get customers: ${error.message}`,
                    };
                }
            }
        });
        this.getMoneyTransfers = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            try {
                const transfers = yield client_1.default.moneyTransfer.findMany({
                    where: {
                        intermediaryId: getCustomerList.userId,
                    },
                    include: {
                        sender: true,
                        receiver: true,
                        intermediary: true,
                    },
                });
                return transfers.map((transfer) => ({
                    senderName: transfer.sender.clientName,
                    senderSurname: transfer.sender.clientSurname,
                    receiverName: transfer.receiver.clientName,
                    receiverSurname: transfer.receiver.clientName,
                    receivedAmount: transfer.receivedAmount,
                    moneyCurrency: transfer.moneyCurrency,
                    receivedDate: transfer.receivedDate,
                    transferDate: transfer.transferDate,
                }));
            }
            catch (error) {
                if (error instanceof Error) {
                    return {
                        success: false,
                        message: `Failed to get money transfers: ${error.message}`,
                    };
                }
            }
        });
        this.getCombinedCustomerData = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("burası db manager sayfası : ", getCustomerList);
                const cashReceivables = yield client_1.default.cashReceivable.findMany({
                    where: {
                        debtorId: getCustomerList.userId,
                    },
                    include: {
                        creditor: true,
                    },
                });
                const debts = yield client_1.default.debt.findMany({
                    where: {
                        creditorId: getCustomerList.userId,
                    },
                    include: {
                        debtor: true,
                    },
                });
                const combinedResult = [
                    ...cashReceivables.map((receivable) => ({
                        type: 'Receivable',
                        id: receivable.creditor.id,
                        customerName: receivable.creditor.clientName,
                        customerSurname: receivable.creditor.clientSurname,
                        debtAmount: receivable.debtAmount,
                        debtCurrency: receivable.debtCurrency,
                        debtIssuanceDate: receivable.debtIssuanceDate,
                        debtRepaymentDate: receivable.debtRepaymentDate,
                    })),
                    ...debts.map((debt) => ({
                        type: 'Debt',
                        id: debt.debtor.id,
                        customerName: debt.debtor.clientName,
                        customerSurname: debt.debtor.clientSurname,
                        debtAmount: debt.debtAmount,
                        debtCurrency: debt.debtCurrency,
                        debtIssuanceDate: debt.debtIssuanceDate,
                        debtRepaymentDate: debt.debtRepaymentDate,
                    })),
                ];
                return {
                    success: true,
                    data: combinedResult,
                };
            }
            catch (error) {
                if (error instanceof Error) {
                    return {
                        success: false,
                        message: `Failed to get customer data: ${error.message}`,
                    };
                }
                return {
                    success: false,
                    message: 'An unknown error occurred',
                };
            }
        });
        // getCombinedCustomerData = async (getCustomerList: GetCustomerListFields): Promise<{ success: boolean; data?: any; message?: string }> => {
        //   try {
        //     console.log("burası db manager sayfasısrrrrrrrrrrrrrrrrrrrrr : ", getCustomerList);
        //     const { userId }= getCustomerList;
        //     const cashReceivables = await prisma.cashReceivable.findMany({
        //       where: {
        //         debtorId: getCustomerList.userId,
        //       },
        //       include: {
        //         creditor: true,
        //       },
        //     });
        //     console.log("nakit miktarı ekrana yazıldı",cashReceivables)
        //     const debts = await prisma.debt.findMany({
        //       where: {
        //         creditorId: getCustomerList.userId,
        //       },
        //       include: {
        //         debtor: true,
        //       },
        //     });
        //     console.log("borç miktarı ekrana yazıldı",debts)
        //     // Kayıtları birleştirin
        //     const combinedResult = [];
        //     if (cashReceivables.length > 0) {
        //       combinedResult.push(
        //         ...cashReceivables.map((receivable) => ({
        //           type: 'Receivable',
        //           id: receivable.creditor.id,
        //           customerName: receivable.creditor.clientName,
        //           customerSurname: receivable.creditor.clientSurname,
        //           debtAmount: receivable.debtAmount,
        //           debtCurrency: receivable.debtCurrency,
        //           debtIssuanceDate: receivable.debtIssuanceDate,
        //           debtRepaymentDate: receivable.debtRepaymentDate,
        //         }))
        //       );
        //     }
        //     if (debts.length > 0) {
        //       combinedResult.push(
        //         ...debts.map((debt) => ({
        //           type: 'Debt',
        //           id: debt.debtor.id,
        //           customerName: debt.debtor.clientName,
        //           customerSurname: debt.debtor.clientSurname,
        //           debtAmount: debt.debtAmount,
        //           debtCurrency: debt.debtCurrency,
        //           debtIssuanceDate: debt.debtIssuanceDate,
        //           debtRepaymentDate: debt.debtRepaymentDate,
        //         }))
        //       );
        //     }
        //     console.log("combined veri ekrana yazıldı ",combinedResult)
        //     if (combinedResult.length === 0) {
        //       return {
        //         success: false,
        //         message: 'No cash receivables or debts found for the user.',
        //       };
        //     }
        //     return {
        //       success: true,
        //       data: combinedResult,
        //     };
        //   } catch (error) {
        //     if (error instanceof Error) {
        //       return {
        //         success: false,
        //         message: `Failed to get customer data: ${error.message}`,
        //       };
        //     }
        //     return {
        //       success: false,
        //       message: 'An unknown error occurred',
        //     };
        //   }
        // };
        // Burasıı detail list methodu 
        this.getCombinedDetailCustomerData = (getCustomerList) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, customerId } = getCustomerList;
                console.log("burası db manager  customerıd ve userıd yazdırıldı burası manager sınıfı:", userId, customerId);
                const cashReceivables = yield client_1.default.cashReceivable.findMany({
                    where: {
                        creditorId: customerId,
                        debtorId: userId
                    },
                    include: {
                        creditor: true, // Alacaklı olan müşteri bilgilerini almak için
                        debtor: true,
                    },
                });
                const debts = yield client_1.default.debt.findMany({
                    where: {
                        debtorId: customerId,
                    },
                    include: {
                        debtor: true,
                        creditor: true,
                    },
                });
                console.log('Cash Receivables:', cashReceivables);
                console.log('Debts:', debts);
                // Alacakları ve borçları tek bir dizi halinde birleştir
                const combinedResult = [
                    ...cashReceivables.map((receivable) => ({
                        type: 'Receivable',
                        id: receivable.creditor.id,
                        customerName: receivable.creditor.clientName,
                        customerSurname: receivable.creditor.clientSurname,
                        debtAmount: receivable.debtAmount,
                        debtCurrency: receivable.debtCurrency,
                        debtIssuanceDate: receivable.debtIssuanceDate,
                        debtRepaymentDate: receivable.debtRepaymentDate,
                    })),
                    ...debts.map((debt) => ({
                        type: 'Debt',
                        id: debt.debtor.id,
                        customerName: debt.debtor.clientName,
                        customerSurname: debt.debtor.clientSurname,
                        debtAmount: debt.debtAmount,
                        debtCurrency: debt.debtCurrency,
                        debtIssuanceDate: debt.debtIssuanceDate,
                        debtRepaymentDate: debt.debtRepaymentDate,
                    })),
                ];
                const totalReceivables = cashReceivables.reduce((acc, curr) => acc + curr.debtAmount, 0);
                const totalDebts = debts.reduce((acc, curr) => acc + curr.debtAmount, 0);
                // Farkı hesapla
                const difference = totalReceivables - totalDebts;
                return {
                    success: true,
                    data: {
                        combinedResult,
                        totalReceivables,
                        totalDebts,
                        difference,
                    },
                };
            }
            catch (error) {
                if (error instanceof Error) {
                    return {
                        success: false,
                        message: `Failed to get customer data: ${error.message}`,
                    };
                }
                return {
                    success: false,
                    message: 'An unknown error occurred',
                };
            }
        });
    }
}
exports.CustomerDbManager = CustomerDbManager;
exports.default = CustomerDbManager;
