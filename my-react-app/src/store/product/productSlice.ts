import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/productsTypes';
import productsApi from '../../api/products/productsApi';

interface ProductsStateType {
    product: ProductType | null;
    error: string | null;
    loading: boolean;
}

const initialState: ProductsStateType = {
    product: null,
    error: null,
    loading: false,
};

const getProduct = createAsyncThunk<ProductType, number, { rejectValue: string }>(
    'products/getProduct',
    async (productId, thunksAPI) => {
        try {
            const response = await productsApi.getProductItem(productId);
            return response.data;
        } catch (error) {
            return thunksAPI.rejectWithValue('Server error');
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProduct.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload ?? null;
        });
        builder.addCase(getProduct.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.product = payload;
        });
    },
});

export const productActions = {
    ...productSlice.actions,
    getProduct,
};

const productReducer = productSlice.reducer;
export default productReducer;
