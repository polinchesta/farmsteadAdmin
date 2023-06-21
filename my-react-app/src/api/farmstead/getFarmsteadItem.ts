import axios from 'axios';
import { FarmsteadsType } from '../../types/farmsteadsTypes';

const getFarmsteadItem = (id: number) =>
    axios<FarmsteadsType>({
        method: 'GET',
        url: `http://localhost:3002/farmsteads/${id}`,
    });

export default getFarmsteadItem;
