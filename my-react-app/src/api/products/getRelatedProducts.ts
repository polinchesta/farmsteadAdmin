import axios from 'axios';
import { ProductType } from '../../types/productsTypes';

const getRelatedProducts = async (relatedIds: number[]) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const url = 'http://localhost:3003/products';  
    const response = await axios.get<ProductType[]>(url);
    const relatedProducts = response.data.filter(product => relatedIds.includes(product.id));
    return relatedProducts;
};

export default getRelatedProducts;
