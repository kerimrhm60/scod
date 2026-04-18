import express, { Request, Response } from "express";
import { IReportService } from "../../bussiness/interface/ıraporService";
import { ReportManager } from "../../bussiness/service/raporManager";
import { SaleManager } from "../../bussiness/service/saleManager";
import { PurchasesManager } from "../../bussiness/service/purchasesManager";
import { ReturnManager } from "../../bussiness/service/returnManager";

const router: express.Router = express.Router();

const saleService = new SaleManager();
const purchaseService = new PurchasesManager();
const returnService = new ReturnManager();

const reportService: IReportService = new ReportManager(
  saleService,
  purchaseService,
  returnService
);

router.get(
  "/allTotalAmount/:UserID",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.UserID);
    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await reportService.getTotals(userId);
    res.send(result);
  }
);

export default router;
