import axios from 'axios';
import { FarmsteadsFilterType, FarmsteadsType } from '../../types/farmsteadsTypes';

const getTopFarmstead = async (filter: FarmsteadsFilterType) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return axios<FarmsteadsType[]>({
    method: 'GET',
    url: 'http://localhost:3002/farmsteads',
    params: {
      _sort: filter.sortField,
      _order: 'desc',
      _limit: 5,
    },
  });
};


export default getTopFarmstead;
