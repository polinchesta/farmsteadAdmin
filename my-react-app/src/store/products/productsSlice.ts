import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType, ProductsFilterType } from '../../types/productsTypes';
import productsApi from '../../api/products/productsApi';
import { addProductItem } from '../../api/products/editProduct';

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

const editProduct = createAsyncThunk<
    ProductType,
    { id: number, updatedProduct: ProductType },
    { rejectValue: string }
>('products/editProduct', async ({ id, updatedProduct }, thunkAPI) => {
    try {
        const response = await productsApi.editProductItem(id, updatedProduct);
        return response.data;
    } catch {
        return thunkAPI.rejectWithValue('Server error');
    }
});

const deleteProduct = createAsyncThunk<
    void,
    number,
    { rejectValue: string }
>('products/deleteProduct', async (id, thunkAPI) => {
    try {
        await productsApi.deleteProductItem(id);
    } catch {
        return thunkAPI.rejectWithValue('Server error');
    }
});

const addProduct = createAsyncThunk<
  ProductType,
  ProductType,
  { rejectValue: string }
>('products/addProduct', async (newProduct, thunkAPI) => {
  try {
    const response = await addProductItem(newProduct);
    return response.data;
  } catch {
    return thunkAPI.rejectWithValue('Server error');
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
        builder.addCase(editProduct.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        
        builder.addCase(editProduct.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
        
        builder.addCase(editProduct.fulfilled, (state, { payload }) => {
            state.loading = false;
            const index = state.products.findIndex((product) => product.id === payload.id);
            if (index !== -1) {
                state.products[index] = payload;
            }
        });
        
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        
        builder.addCase(deleteProduct.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
        
        builder.addCase(deleteProduct.fulfilled, (state, { meta: { arg: id } }) => {
            state.loading = false;
            state.products = state.products.filter((product) => product.id !== id);
        });
        builder.addCase(addProduct.pending, (state) => {
            state.loading = true;
            state.error = undefined;
          });
          
          builder.addCase(addProduct.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
          });
          
          builder.addCase(addProduct.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.products.push(payload);
          });
          
    },
});

export const productsActions = {
    ...productsSlice.actions,
    getProductsList,
    deleteProduct,
    editProduct
};

const productsReducer = productsSlice.reducer;
export default productsReducer;
