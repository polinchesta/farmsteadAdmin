import getFarmsteadItem from './getFarmsteadItem';
import getFarmsteadsList from './getFarmsteadList';
import getTopFarmstead from './getTopFarmstead';
import { editFarmsteadItem, deleteFarmsteadItem } from './editFarmstead';


const farmsteadsApi = {
    getFarmsteadsList,
    getFarmsteadItem,
    getTopFarmstead,
    deleteFarmsteadItem,
    editFarmsteadItem,
};

export default farmsteadsApi;
