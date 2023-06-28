import axios from "axios";
import { ProductOrder, ProductType } from "../../types/productsTypes";

const getProductItem = (id: number) =>
  axios<ProductType>({
    method: "GET",
    url: `http://localhost:3003/products/${id}`,
  });

const getProductOrder= () =>
  axios<ProductOrder>({
    method: "GET",
    url:'http://localhost:3003/orderIn1Click' ,
  });

export {getProductItem, getProductOrder};
