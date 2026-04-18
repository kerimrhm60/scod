import { Product, Sale } from "@prisma/client";

export type SaleWithProductDto = Sale & {
  product: Pick<Product, "ProductName" | "SalePrice">;
};
