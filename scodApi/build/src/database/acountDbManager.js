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
exports.AccountDbManager = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
// Account tipini import et
class AccountDbManager {
    constructor() {
        this.createAccount = (accountData) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const account = yield client_1.default.account.create({
                    data: {
                        totalAmount: (_a = accountData.totalAmount) !== null && _a !== void 0 ? _a : 0,
                        totalCurrency: (_b = accountData.totalCurrency) !== null && _b !== void 0 ? _b : "USD",
                        userId: accountData.userId,
                        clientId: accountData.clientId,
                    },
                });
                return { success: true, message: "Account created succesfully" };
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
                        message: "Failed to create account due to an unknown error",
                    };
                }
            }
        });
        this.createtransferMany = (transferManyData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const transferMany = yield client_1.default.moneyTransfer.create({
                    data: {
                        receivedAmount: transferManyData.receivedAmount,
                        moneyCurrency: transferManyData.moneyCurrency,
                        senderId: transferManyData.senderId,
                        receiverId: transferManyData.receiverId,
                        intermediaryId: transferManyData.intermediaryId,
                        transferDate: transferManyData.transferDate,
                        receivedDate: transferManyData.receivedDate,
                    },
                });
                return { success: true, message: "Money transfer created successfully" };
            }
            catch (error) {
                if (error instanceof Error) {
                    return {
                        success: false,
                        message: `Failed to create money transfer: ${error.message}`,
                    };
                }
                else {
                    return {
                        success: false,
                        message: "Bilinmeyen bir hata nedeniyle para transferi oluşturulamadı",
                    };
                }
            }
        });
        this.createDebt = (debtData) => __awaiter(this, void 0, void 0, function* () {
            console.log("burası db manager classı borç ekleme methodu:", debtData);
            // Alacaklının nakit durumunu işlem başlamadan kontrol ediyoruz
            const userCash = yield client_1.default.userCash.findFirst({
                where: { userId: debtData.creditorId },
            });
            // Eğer userCash kaydı yoksa ya da toplam nakit, borç miktarından azsa hata fırlat
            if (!userCash || userCash.totalCash < debtData.debtAmount) {
                throw new Error("Alacaklının yeterli nakiti yok.");
            }
            // Transaction işlemini nakit kontrolünden sonra başlatıyoruz
            const result = yield client_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                let newDebt;
                // Mevcut borcu kontrol et
                const existingDebt = yield prisma.debt.findFirst({
                    where: {
                        debtorId: debtData.debtorId,
                        creditorId: debtData.creditorId,
                    },
                });
                if (existingDebt) {
                    // Eğer borç varsa, mevcut borcu artır
                    newDebt = yield prisma.debt.update({
                        where: { id: existingDebt.id },
                        data: { debtAmount: { increment: debtData.debtAmount } },
                    });
                }
                else {
                    // Eğer borç yoksa yeni bir borç kaydı oluştur
                    newDebt = yield prisma.debt.create({
                        data: {
                            debtAmount: debtData.debtAmount,
                            debtCurrency: debtData.debtCurrency,
                            debtorId: debtData.debtorId,
                            creditorId: debtData.creditorId,
                            debtIssuanceDate: debtData.debtIssuanceDate,
                            debtRepaymentDate: debtData.debtRepaymentDate,
                        },
                    });
                }
                // CashReceivable kaydını kontrol et ama yoksa yeni kayıt oluşturma, direkt borç verme işlemine geç
                const cashReceivable = yield prisma.cashReceivable.findFirst({
                    where: {
                        creditorId: debtData.debtorId,
                    },
                });
                if (cashReceivable) {
                    // Eğer CashReceivable varsa borç miktarını azalt
                    yield prisma.cashReceivable.update({
                        where: { id: cashReceivable.id },
                        data: { debtAmount: { decrement: debtData.debtAmount } },
                    });
                    console.log("Güncellenen nakit alacak: ", cashReceivable);
                }
                else {
                    console.log("CashReceivable kaydı bulunamadı, borç işlemine devam ediliyor.");
                }
                // Nakit miktarını güncelle
                const updatedUserCash = yield prisma.userCash.update({
                    where: { id: userCash.id }, // userCash'in null olmadığından emin olduk
                    data: { totalCash: { decrement: debtData.debtAmount } },
                });
                return { newDebt, updatedUserCash };
            }));
            return {
                success: true,
                message: "Borç başarıyla oluşturuldu",
                data: result,
            };
        });
        //  1.deneme createcashReceivable = async (debtData: DebtFields): Promise<any> => {
        //     try {
        //       // Transaction başlat
        //       const result = await prisma.$transaction(async (prisma) => {
        //         // Mevcut bir nakit alacak kaydı var mı kontrol et
        //         const existingCashReceivable = await prisma.cashReceivable.findFirst({
        //           where: {
        //             debtorId: debtData.debtorId,
        //             creditorId: debtData.creditorId,
        //             debtIssuanceDate: debtData.debtIssuanceDate,
        //           },
        //         });
        //         let newCashReceivable;
        //         if (existingCashReceivable) {
        //           // Mevcut nakit alacak kaydını güncelle (miktarı artır)
        //           newCashReceivable = await prisma.cashReceivable.update({
        //             where: { id: existingCashReceivable.id },
        //             data: { debtAmount: { increment: debtData.debtAmount } },
        //           });
        //         } else {
        //           // Yeni nakit alacak kaydını oluştur
        //           newCashReceivable = await prisma.cashReceivable.create({
        //             data: {
        //               debtAmount: debtData.debtAmount,
        //               debtCurrency: debtData.debtCurrency,
        //               debtorId: debtData.debtorId,
        //               creditorId: debtData.creditorId,
        //               debtIssuanceDate: debtData.debtIssuanceDate,
        //               debtRepaymentDate: debtData.debtRepaymentDate,
        //             },
        //           });
        //         }
        //         console.log("Nakit alacak: ", newCashReceivable);
        //         // Kullanıcının nakit bilgisini al
        //         const userCash = await prisma.userCash.findFirst({
        //           where: { userId: debtData.debtorId },
        //         });
        //         if (!userCash) {
        //           throw new Error("UserCash record not found");
        //         }
        //         // Toplam nakiti güncelle (artır)
        //         const updatedUserCash = await prisma.userCash.update({
        //           where: { id: userCash.id },
        //           data: { totalCash: { increment: debtData.debtAmount } },
        //         });
        //         // Mevcut borç kaydını güncelle veya sil
        //         const existingDebt = await prisma.debt.findFirst({
        //           where: {
        //             debtorId: debtData.debtorId,
        //             creditorId: debtData.creditorId,
        //           },
        //         });
        //         if (existingDebt) {
        //           if (existingDebt.debtAmount <= debtData.debtAmount) {
        //             // Eğer borç miktarı sıfır veya negatif oluyorsa, borcu sil
        //             await prisma.debt.delete({
        //               where: { id: existingDebt.id },
        //             });
        //             console.log("Borç kaydı silindi.");
        //           } else {
        //             // Borcu verilen miktar kadar güncelle (düşür)
        //             const updatedDebt = await prisma.debt.update({
        //               where: { id: existingDebt.id },
        //               data: { debtAmount: { decrement: debtData.debtAmount } },
        //             });
        //             console.log("Güncellenen borç: ", updatedDebt);
        //           }
        //         }
        //         return { newCashReceivable, updatedUserCash };
        //       });
        //       return { success: true, message: "Cash receivable created successfully", data: result };
        //     } catch (error) {
        //       if (error instanceof Error) {
        //         console.error("Error creating cash receivable:", error.message);
        //         return {
        //           success: false,
        //           message: `Failed to create cash receivable: ${error.message}`,
        //         };
        //       } else {
        //         console.error("Unknown error creating cash receivable:", error);
        //         return {
        //           success: false,
        //           message: "Bilinmeyen bir hata nedeniyle nakit alacak oluşturulamadı",
        //         };
        //       }
        //     }
        //   };
        this.createcashReceivable = (debtData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield client_1.default.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                    const existingCashReceivable = yield prisma.cashReceivable.findFirst({
                        where: {
                            debtorId: debtData.debtorId,
                            creditorId: debtData.creditorId,
                            debtIssuanceDate: debtData.debtIssuanceDate,
                        },
                    });
                    let newCashReceivable;
                    if (existingCashReceivable) {
                        newCashReceivable = yield prisma.cashReceivable.update({
                            where: { id: existingCashReceivable.id },
                            data: { debtAmount: { increment: debtData.debtAmount } },
                        });
                    }
                    else {
                        newCashReceivable = yield prisma.cashReceivable.create({
                            data: {
                                debtAmount: debtData.debtAmount,
                                debtCurrency: debtData.debtCurrency,
                                debtorId: debtData.debtorId,
                                creditorId: debtData.creditorId,
                                debtIssuanceDate: debtData.debtIssuanceDate,
                                debtRepaymentDate: debtData.debtRepaymentDate,
                            },
                        });
                    }
                    console.log("Nakit alacak: ", newCashReceivable);
                    const userCash = yield prisma.userCash.findFirst({
                        where: { userId: debtData.debtorId },
                    });
                    if (!userCash) {
                        throw new Error("UserCash record not found");
                    }
                    const updatedUserCash = yield prisma.userCash.update({
                        where: { id: userCash.id },
                        data: { totalCash: { increment: debtData.debtAmount } },
                    });
                    const existingDebt = yield prisma.debt.findFirst({
                        where: {
                            debtorId: debtData.creditorId,
                        },
                    });
                    if (existingDebt) {
                        if (existingDebt.debtAmount <= debtData.debtAmount) {
                            yield prisma.debt.delete({
                                where: { id: existingDebt.id },
                            });
                            console.log("Borç kaydı silindi.");
                        }
                        else {
                            const updatedDebt = yield prisma.debt.update({
                                where: { id: existingDebt.id },
                                data: { debtAmount: { decrement: debtData.debtAmount } },
                            });
                            console.log("Güncellenen borç: ", updatedDebt);
                        }
                    }
                    return { newCashReceivable, updatedUserCash };
                }));
                return {
                    success: true,
                    message: "Cash receivable created successfully",
                    data: result,
                };
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Error creating cash receivable:", error.message);
                    return {
                        success: false,
                        message: `Failed to create cash receivable: ${error.message}`,
                    };
                }
                else {
                    console.error("Unknown error creating cash receivable:", error);
                    return {
                        success: false,
                        message: "Bilinmeyen bir hata nedeniyle nakit alacak oluşturulamadı",
                    };
                }
            }
        });
        // createUserCash = async (userCashData: UserCashFields):Promise<any> => {
        //   try {
        //     console.log("veriler dbmaanger sınıfına geldi", userCashData);
        //       const userCash = await prisma.userCash.create({
        //         data: {
        //             ...userCashData
        //         },
        //       });
        //       return { success: true, message: "User cash created successfully" };
        //     } catch (error) {
        //       if (error instanceof Error) {
        //         console.error("Error creating debt:", error.message); // Hata mesajını loglama
        //         return {
        //           success: false,
        //           message: `Failed to create user cash: ${error.message}`,
        //         };
        //       } else {
        //         console.error("Unknown error creating user cash:", error); // Bilinmeyen hata mesajını loglama
        //         return {
        //           success: false,
        //           message: "Bilinmeyen bir hata nedeniyle user cash oluşturulamadı",
        //         };
        //       }
        //     }
        // }
        this.createUserCash = (userCashData) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Veriler dbManager sınıfına geldi", userCashData);
                // Öncelikle userId'ye ait bir kayıt olup olmadığını kontrol edelim
                const existingUserCash = yield client_1.default.userCash.findFirst({
                    where: {
                        userId: userCashData.userId,
                    },
                });
                let userCash;
                if (existingUserCash) {
                    userCash = yield client_1.default.userCash.update({
                        where: { id: existingUserCash.id },
                        data: {
                            totalCash: { increment: userCashData.totalCash },
                            cashCurrency: userCashData.cashCurrency,
                        },
                    });
                    console.log("User cash updated successfully", userCash);
                    return { success: true, message: "User cash updated successfully" };
                }
                else {
                    // Eğer aynı userId'ye ait kayıt yoksa yeni bir satır oluşturalım
                    userCash = yield client_1.default.userCash.create({
                        data: Object.assign({}, userCashData),
                    });
                    console.log("User cash created successfully", userCash);
                    return { success: true, message: "User cash created successfully" };
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Error creating or updating user cash:", error.message); // Hata mesajını loglama
                    return {
                        success: false,
                        message: `Failed to create or update user cash: ${error.message}`,
                    };
                }
                else {
                    console.error("Unknown error creating or updating user cash:", error); // Bilinmeyen hata mesajını loglama
                    return {
                        success: false,
                        message: "Bilinmeyen bir hata nedeniyle user cash oluşturulamadı veya güncellenemedi",
                    };
                }
            }
        });
        this.getInactiveUsers = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const inactiveUsers = yield client_1.default.user.findMany({
                    where: {
                        isActive: false,
                    },
                });
                return inactiveUsers;
            }
            catch (error) {
                console.error("Hata:", error);
                throw new Error("Kullanıcıları getirirken bir hata oluştu");
            }
        });
        this.getUserCashAmount = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userCashAmount = yield client_1.default.userCash.findMany({
                    where: {
                        userId: userId,
                    },
                });
                return userCashAmount;
            }
            catch (error) {
                console.log("Hata: ", error);
                throw new Error("Kullanıcı toplam nakit miktarı getirirken bir hata oluştu");
            }
        });
        this.getUserTotalDebt = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userCashAmount = yield client_1.default.debt.aggregate({
                    _sum: {
                        debtAmount: true,
                    },
                    where: {
                        creditorId: userId,
                    },
                });
                return userCashAmount;
            }
            catch (error) {
                console.log("Hata: ", error);
                throw new Error("Kullanıcı toplam nakit miktarı getirirken bir hata oluştu");
            }
        });
        this.getUserFinancialSummary = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                // İlk olarak, toplam nakit miktarını ve toplam borcu çekmek için iki asenkron çağrıyı paralel olarak yapıyoruz
                const [userCashData, userDebtData] = yield Promise.all([
                    client_1.default.userCash.findFirst({
                        where: { userId },
                        select: { totalCash: true },
                    }),
                    client_1.default.debt.aggregate({
                        _sum: { debtAmount: true },
                        where: { creditorId: userId },
                    }),
                ]);
                // Nakit ve borç miktarlarını çıkartıp döndürüyoruz
                const totalCash = (userCashData === null || userCashData === void 0 ? void 0 : userCashData.totalCash) || 0;
                const totalDebt = userDebtData._sum.debtAmount || 0;
                return { totalCash, totalDebt };
            }
            catch (error) {
                console.log("Hata: ", error);
                throw new Error("Kullanıcı finansal özetini getirirken bir hata oluştu");
            }
        });
        this.activateUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield client_1.default.user.update({
                    where: {
                        id: userId.id,
                    },
                    data: {
                        isActive: true,
                    },
                });
                return { success: true, message: "User sisteme erişim izni verildi" };
            }
            catch (error) {
                console.error("Hata:", error);
                return {
                    success: false,
                    message: "Kullanıcıyı güncellerken bir hata oluştu",
                };
            }
        });
        this.getAccountIınfo = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const accountInfo = yield client_1.default.user.findMany({
                    where: {
                        id: userId,
                    },
                });
                return accountInfo;
            }
            catch (error) {
                console.log("Hata: ", error);
                throw new Error("Kullanıcı hesap bilgileri getirilirken bir hata oluştu");
            }
        });
    }
}
exports.AccountDbManager = AccountDbManager;
exports.default = AccountDbManager;
