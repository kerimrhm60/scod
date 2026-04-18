import express, { Request, Response } from "express";
import { registerSchema } from "../../validations/auth/registerValidator";
import { requestValidator } from "../../middleware/requestValidator";
import { ICustomerService } from "../../bussiness/interface/ıcustomerService";
import { CustomerManager } from "../../bussiness/service/customerManager";
import { CreateCustomerDto } from "../../dtos/customer/customerDto";


const router: express.Router = express.Router();
const customerService: ICustomerService = new CustomerManager();


router.post(
  "/createCustomer",
  // requestValidator(registerSchema),

  async (req: Request, res: Response): Promise<void> => {
    const request = req.body as CreateCustomerDto;
    console.log("gelen istek console yazdırılıyor", request)
    const result = await customerService.createCustomer(request);
    res.send(result);
  }
);

router.get(
  "/customerList/:UserID",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.UserID);
    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await customerService.customerList(userId);
    res.send(result);
  }
);

export default router;