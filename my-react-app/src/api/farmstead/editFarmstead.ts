import axios from "axios";
import { FarmsteadsType } from "../../types/farmsteadsTypes";

const editFarmsteadItem = (id: number, updatedFarmstead: FarmsteadsType) =>
  axios.put<FarmsteadsType>(
    `http://localhost:3002/farmsteads/${id}`,
    updatedFarmstead
  );

const deleteFarmsteadItem = (id: number) =>
  axios.delete(`http://localhost:3002/farmsteads/${id}`);

export { editFarmsteadItem, deleteFarmsteadItem };
