import getProductItem from './getProductItem';
import getProductsList from './getProductsList';
import { editProductItem, deleteProductItem, addProductItem } from './editProduct';

const productsApi = {
    getProductsList,
    getProductItem,
    editProductItem,
    deleteProductItem,
    addProductItem
};

export default productsApi;
