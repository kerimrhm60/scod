import { RaporResponseDto } from "../../dtos/rapor/rapor";
import { IPurchasesService } from "../interface/ıpurchaseService";
import { IReportService } from "../interface/ıraporService";
import { IReturnService } from "../interface/ıreturnService";
import { ISaleService } from "../interface/ısaleService";
import { HttpStatus, Response } from "../../response/response";

export class ReportManager implements IReportService {
  constructor(
    private saleService: ISaleService,
    private purchaseService: IPurchasesService,
    private returnService: IReturnService
  ) {}

  public async getTotals(userId: number): Promise<Response<RaporResponseDto>> {
    try {
      const [saleResponse, purchaseResponse, returnResponse] =
        await Promise.all([
          this.saleService.saleTotalAmount(userId),
          this.purchaseService.purchaseTotalAmount(userId),
          this.returnService.returnTotalAmount(userId),
        ]);
      if (
        !saleResponse.isSuccess &&
        !purchaseResponse.isSuccess &&
        !returnResponse.isSuccess
      ) {
        return Response.failure<RaporResponseDto>(
          "Toplam tutarlar getirilemedi",
          undefined,
          HttpStatus.NOT_FOUND
        );
      }

      const result: RaporResponseDto = {
        saleTotal: saleResponse.data?.TotalAmount ?? 0,
        debtSaleTotal: saleResponse.data?.DebtTotal ?? 0,
        purchaseTotal: purchaseResponse.data?.TotalAmount ?? 0,
        saleReturnTotal: returnResponse.data?.saleReturnTotal ?? 0,
        purchaseReturnTotal: returnResponse.data?.purchaseReturnTotal ?? 0,
      };

      return Response.success<RaporResponseDto>(
        result,
        "Toplam tutarlar başarıyla getirildi",
        HttpStatus.OK
      );
    } catch (error) {
      console.error("Toplam tutarlar getirilirken hata:", error);
      return Response.failure<RaporResponseDto>(
        "Toplam tutarlar getirilirken hata oluştu",
        undefined,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
