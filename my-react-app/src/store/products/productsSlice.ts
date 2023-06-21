import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType, ProductsFilterType } from '../../types/productsTypes';
import productsApi from '../../api/products/productsApi';

interface ProductsStateType {
    products: ProductType[];
    error?: string;
    loading: boolean;
}

const initialState: ProductsStateType = {
    products: [],
    error: undefined,
    loading: false,
};

const getProductsList = createAsyncThunk<
    Array<ProductType>,
    ProductsFilterType,
    { rejectValue: string }
>('products/getProductsList', async (data, thunksApi) => {
    try {
        const response = await productsApi.getProductsList(data);
        return response.data;
    } catch {
        return thunksApi.rejectWithValue('Server error');
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductsList.pending, (state) => {
            state.loading = true;
            state.error = undefined;
            state.products = [];
        });
        builder.addCase(getProductsList.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
        builder.addCase(getProductsList.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.products = payload;
        });
    },
});

export const productsActions = {
    ...productsSlice.actions,
    getProductsList,
};

const productsReducer = productsSlice.reducer;
export default productsReducer;
