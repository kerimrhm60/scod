import express, { Request, Response } from "express";
import { IProductService } from "../../bussiness/interface/ıproductService";
import { ProductManager } from "../../bussiness/service/productManager";
import { CreateProductDto, UpdateProductDto } from "../../dtos/product/productDto";

const router: express.Router = express.Router();
const productService: IProductService = new ProductManager();

router.post(
  "/createProduct",
  //requestValidator(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    const request = req.body as CreateProductDto;
    const result = await productService.createProduct(request);
    res.send(result);
  }
);

router.get(
  "/getProductsByUserId/:UserID",
  async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.UserID);
    if (isNaN(userId)) {
      res.status(400).send({ message: "Geçersiz kullanıcı ID" });
      return;
    }
    const result = await productService.getProdcutList(userId);
    res.send(result);
  }
);
router.get(
  "/getProductByBarcode",
  async (req: Request, res: Response): Promise<void> => {
    const barcodeNumber = req.query.BarcodeNumber as string | undefined;
    console.log("object", barcodeNumber);
    if (!barcodeNumber) {
      res
        .status(400)
        .send({ message: "Barkod numarası veya ürün adı girilmelidir." });
      return;
    }

    const result = await productService.getProductByBarcode(barcodeNumber);
    res.send(result);
  }
);
router.get(
  "/getProdcutNameList",
  async (req: Request, res: Response): Promise<void> => {
    const request = req.query.ProductName as string | undefined;

    if (!request) {
      res.status(400).send({ message: "Ürün adı girilmelidir." });
      return;
    }

    const result = await productService.getProdcutNameList(request);
    res.send(result);
  }
);

router.get(
  "/getProductById",
  async (req: Request, res: Response): Promise<void> => {
    const productId = parseInt(req.query.ProductId as string, 10);

    if (isNaN(productId)) {
      res.status(400).send({ message: "Geçerli bir ürün ID'si girilmelidir." });
      return;
    }

    const result = await productService.getProductById(productId);
    res.status(result.statusCode || 200).send(result);
  }
);

router.post(
  "/updateProduct",
  //requestValidator(registerSchema),
  async (req: Request, res: Response): Promise<void> => {
    const request = req.body as UpdateProductDto;
    const result = await productService.updateProduct(request);
    res.send(result);
  }
);
export default router;
