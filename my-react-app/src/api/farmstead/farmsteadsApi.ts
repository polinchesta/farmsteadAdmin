import getFarmsteadItem from './getFarmsteadItem';
import getFarmsteadsList from './getFarmsteadList';
import getTopFarmstead from './getTopFarmstead';
import sendComment from './postComments';

const farmsteadsApi = {
    getFarmsteadsList,
    getFarmsteadItem,
    getTopFarmstead,
    sendComment
};

export default farmsteadsApi;
