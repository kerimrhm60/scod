import express, { Request, Response } from "express";
import { CreateSaleDto, UpdateSaleDto } from "../../dtos/sale/saleDto";
import { ISaleService } from "../../bussiness/interface/ısaleService";
import { SaleManager } from "../../bussiness/service/saleManager";

const router: express.Router = express.Router();
const saleService: ISaleService = new SaleManager();

router.post(
  "/createSale",
  //requestValidator(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    const request = req.body as CreateSaleDto;
    const result = await saleService.createSale(request);
    res.send(result);
  }
);

router.get(
  "/saleList/:UserID",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.UserID);
    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await saleService.saleList(userId);
    res.send(result);
  }
);

router.get(
  "/saleTotalList/:UserID/:type",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.UserID);
    const type = req.params.type;

    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }

    if (!type || (type !== "standard" && type !== "debt" && type !== "all")) {
      res.status(400).send({ message: "Geçersiz return type" });
      return;
    }

    try {
      const result = await saleService.saleTotalList(userId, type);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: "Veri alınırken hata oluştu", error });
    }
  }
);

router.get(
  "/saleTotalAmount/:UserID",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.UserID);
    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await saleService.saleTotalAmount(userId);
    res.send(result);
  }
);

router.post(
  "/updateSale",
  //requestValidator(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    console.log("güncellenecek sale verisi console yazdırılıyor: ",req.body)
    const request = req.body as UpdateSaleDto;
    const result = await saleService.updateSale(request);
    res.send(result);
  }
);

export default router;
