import {getFarmsteadItem, getFarmsteadOrder, getFarmsteadBooking} from './getFarmsteadItem';
import getFarmsteadsList from './getFarmsteadList';
import getTopFarmstead from './getTopFarmstead';
import { editFarmsteadItem, deleteFarmsteadItem } from './editFarmstead';


const farmsteadsApi = {
    getFarmsteadsList,
    getFarmsteadItem,
    getTopFarmstead,
    deleteFarmsteadItem,
    editFarmsteadItem,
    getFarmsteadOrder,
    getFarmsteadBooking
};

export default farmsteadsApi;
