import axios from "axios";
import { ProductType } from "../../types/productsTypes";

const editProductItem = (id: number, updatedProduct: ProductType) =>
  axios.put<ProductType>(
    `http://localhost:3003/products/${id}`,
    updatedProduct
  );

const deleteProductItem = (id: number) =>
  axios.delete(`http://localhost:3003/products/${id}`);

const addProductItem = (newProduct: ProductType) =>
  axios.post<ProductType>("http://localhost:3003/products", newProduct);

export { editProductItem, deleteProductItem, addProductItem };
