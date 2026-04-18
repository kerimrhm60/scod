import express, { Request, Response } from "express";
import { SuplierFields } from "../../types/type/suplier";
import { SuplierManager } from "../../bussiness/service/suplierManager";
import { ISuplierService } from "../../bussiness/interface/ısuplierService";
import { SuplierDto } from "../../dtos/suplier/suplierDto";

const router: express.Router = express.Router();
const suplierService: ISuplierService = new SuplierManager();



router.post(
  "/createSupplier",
  //requestValidator(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    const request = req.body as SuplierDto;
    const result = await suplierService.createSupplier(request);
    res.send(result);
  }
);
router.get(
  "/suplierList/:UserID",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.UserID);
    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await suplierService.suplierList(userId);
    res.send(result);
  }
);
  export default router;
