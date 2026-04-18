import express, { Request, Response } from "express";
import { registerSchema } from "../../validations/auth/registerValidator";
import { requestValidator } from "../../middleware/requestValidator";

import { IReturnService } from "../../bussiness/interface/ıreturnService";
import { ReturnManager } from "../../bussiness/service/returnManager";
import { CreateReturnDto } from "../../dtos/return/return";


const router: express.Router = express.Router();
const returnService: IReturnService = new ReturnManager();

router.post(
  "/createReturn",
  async (req: Request, res: Response): Promise<void> => {
    const request = req.body as CreateReturnDto;
    const result = await returnService.createReturn(request);
    res.send(result);
  }
);

router.get(
  "/returnTotalAmount/:UserID",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.UserID);
    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await returnService.returnTotalAmount(userId);
    res.send(result);
  }
);


// router.get(
//   "/returnList/:UserID",
//   async (req: Request, res: Response): Promise<void> => {
//     const userId = parseInt(req.params.UserID);
//     if (isNaN(userId)) {
//       res.status(400).send({ message: "Geçersiz kullanıcı ID" });
//       return;
//     }
//     const result = await returnService.returnList(userId);
//     res.send(result);
//   }
// );



router.get(
  "/returnList/:UserID/:type",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.UserID);
    const type = req.params.type;

    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }

    if (!type || (type !== "customer" && type !== "supplier")) {
      res.status(400).send({ message: "Geçersiz return type" });
      return;
    }

    try {
      const result = await returnService.returnList(userId, type);
      res.send(result);
    } catch (error) {
      res.status(500).send({ message: "Veri alınırken hata oluştu", error });
    }
  }
);



// router.get(
//   "/returnSupplierList/:UserID",
//   async (req: Request, res: Response): Promise<void> => {
//     const userId = parseInt(req.params.UserID);
//     if (isNaN(userId)) {
//       res.status(400).send({ message: "Geçersiz kullanıcı ID" });
//       return;
//     }
//     const result = await returnService.returnSupplierList(userId);
//     res.send(result);
//   }
// );
export default router;