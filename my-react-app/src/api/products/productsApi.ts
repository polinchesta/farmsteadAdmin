import { getProductItem, getProductOrder } from "./getProductItem";
import getProductsList from "./getProductsList";
import { editProductItem, deleteProductItem } from "./editProduct";

const productsApi = {
  getProductsList,
  getProductItem,
  editProductItem,
  getProductOrder,
  deleteProductItem,
};

export default productsApi;
