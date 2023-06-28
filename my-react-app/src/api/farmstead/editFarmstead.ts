import axios from "axios";
import { FarmsteadsTypeUpdate } from "../../types/farmsteadsTypes";

const editFarmsteadItem = (id: number, updatedFarmstead: FarmsteadsTypeUpdate) =>
  axios.put<FarmsteadsTypeUpdate>(
    `http://localhost:3002/farmsteads/${id}`,
    updatedFarmstead
  );

const deleteFarmsteadItem = (id: number) =>
  axios.delete(`http://localhost:3002/farmsteads/${id}`);

export { editFarmsteadItem, deleteFarmsteadItem };
