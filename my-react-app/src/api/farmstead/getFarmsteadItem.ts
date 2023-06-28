import axios from "axios";
import { FarmsteadOrder, FarmsteadsType } from "../../types/farmsteadsTypes";

const getFarmsteadItem = (id: number) =>
  axios<FarmsteadsType>({
    method: "GET",
    url: `http://localhost:3002/farmsteads/${id}`,
  });

const getFarmsteadOrder = () =>
  axios<FarmsteadOrder>({
    method: "GET",
    url: "http://localhost:3002/orderIn1Click",
  });

const getFarmsteadBooking = () =>
  axios<FarmsteadOrder>({
    method: "GET",
    url: "http://localhost:3002/order",
  });

export { getFarmsteadItem, getFarmsteadOrder, getFarmsteadBooking };
