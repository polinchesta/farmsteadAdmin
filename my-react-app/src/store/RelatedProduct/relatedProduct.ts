import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/productsTypes';
import relatedProductsApi from '../../api/products/getRelatedProducts';

interface RelatedProductsStateType {
  relatedProducts: ProductType[];
  error?: string;
  loading: boolean;
}

const initialState: RelatedProductsStateType = {
  relatedProducts: [],
  error: undefined,
  loading: false,
};

const fetchRelatedProducts = createAsyncThunk<
  ProductType[],
  number[],
  { rejectValue: string }
>('relatedProducts/fetchRelatedProducts', async (productIds, thunkAPI) => {
  try {
    const response = await relatedProductsApi(productIds);
    return response; 
  } catch {
    return thunkAPI.rejectWithValue('Failed to fetch related products');
  }
});


const relatedProductsSlice = createSlice({
  name: 'relatedProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedProducts.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.relatedProducts = [];
    });
    builder.addCase(fetchRelatedProducts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(fetchRelatedProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.relatedProducts = payload;
    });
  },
});

export const relatedProductsActions = {
  ...relatedProductsSlice.actions,
  fetchRelatedProducts,
};

const relatedProductsReducer = relatedProductsSlice.reducer;
export default relatedProductsReducer;
