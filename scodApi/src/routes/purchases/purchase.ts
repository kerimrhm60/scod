import express, { Request, Response } from "express";
import { CreateSaleDto } from "../../dtos/sale/saleDto";
import { ISaleService } from "../../bussiness/interface/ısaleService";
import { SaleManager } from "../../bussiness/service/saleManager";
import { IPurchasesService } from "../../bussiness/interface/ıpurchaseService";
import { PurchasesManager } from "../../bussiness/service/purchasesManager";
import { CreatePurchaseDto } from "../../dtos/purchases/purchases";

const router: express.Router = express.Router();
const purchaseService: IPurchasesService = new PurchasesManager();

router.post(
  "/createPurchase",
  //requestValidator(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    const request = req.body as CreatePurchaseDto;
    const result = await purchaseService.createPurchase(request);
    res.send(result);
  }
);
router.get(
  "/purchaseList/:UserID",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.UserID);
    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await purchaseService.purchaseList(userId);
    res.send(result);
  }
);
router.get(
  "/purchaseTotalAmount/:UserID",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.UserID);
    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await purchaseService.purchaseTotalAmount(userId);
    res.send(result);
  }
);
export default router;
