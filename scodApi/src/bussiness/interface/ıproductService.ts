import { CreateProductDto, UpdateProductDto } from "../../dtos/product/productDto";
import { ProductEditDto, ProductResponseDto } from "../../dtos/product/productResponseDto";
import { Response } from "../../response/response";

export interface IProductService {
    createProduct(request:CreateProductDto): Promise<Response<boolean>>;
    getProdcutList(userId: number): Promise<Response<ProductResponseDto[]>>;
    getProductByBarcode(barcodeNumber?: string, productName? : string): Promise<Response<ProductResponseDto | null>>;
    getProdcutNameList(request: string): Promise<Response<ProductResponseDto[]>>;
    getProductById(productId: number): Promise<Response<ProductEditDto>>;
    updateProduct(request: UpdateProductDto): Promise<Response<boolean>>;
}
