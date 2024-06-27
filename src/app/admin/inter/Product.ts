// product.interface.ts

import { FileHandle } from "./File-Handle.model";

export interface Product {
  productId:number;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDesc: string;
  productImage: FileHandle;
}
