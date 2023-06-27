import axios from "axios";
import { ProductTypeUpdate } from "../../types/productsTypes";

const editProductItem = (id: number, updatedProduct: ProductTypeUpdate) =>
  axios.put<ProductTypeUpdate>(
    `http://localhost:3003/products/${id}`,
    updatedProduct
  );

const deleteProductItem = (id: number) =>
  axios.delete(`http://localhost:3003/products/${id}`);

export { editProductItem, deleteProductItem};
