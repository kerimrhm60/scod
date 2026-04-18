import express, { Request, Response } from "express";
import { registerSchema } from "../../validations/auth/registerValidator";
import { requestValidator } from "../../middleware/requestValidator";
import { IUserService } from "../../bussiness/interface/ıuserService";
import { UserManager } from "../../bussiness/service/userManager";
import { RegisterUserDto } from "../../dtos/user/registerResponseDto";
import { LoginDto } from "../../dtos/user/loginDto";
import { authenticateToken, AuthRequest } from "../../middleware/authenticateToken";
import { authorizeAdmin } from "../../middleware/authorizeAdmin";

const router: express.Router = express.Router();
const userService: IUserService = new UserManager();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const model = req.body as LoginDto;
  const result = await userService.login(model);
  res.send(result);
});
router.post(
  "/register",
  requestValidator(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    const request = req.body as RegisterUserDto;
    const result = await userService.register(request);
    res.send(result);
  }
);

router.get(
  "/userList/:UserID",
  authenticateToken,
  authorizeAdmin,
  async (req: AuthRequest, res: Response) => {
    console.log(req.user?.UserID, req.user?.RoleID);

    const requestUserID = parseInt(req.params.UserID);
    if (isNaN(requestUserID)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await userService.userList(requestUserID);
    res.send(result);
  }
);
// router.get(
//   "/userList/:UserID",
//   async (req: Request, res: Response): Promise<void> => {
//     const request = parseInt(req.params.UserID);
//     if (isNaN(request)) {
//       res.status(400).send({ message: "Geçersiz kullanıcı ID" });
//       return;
//     }
//     const result = await userService.userList(request);
//     res.send(result);
//   }
// );
export default router;
