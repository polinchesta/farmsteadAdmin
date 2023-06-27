import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductTypeUpdate } from "../../types/productsTypes";
import productsApi from "../../api/products/productsApi";

interface ProductsStateType {
  product: ProductTypeUpdate | null;
  error: string | null;
  loading: boolean;
}

const initialState: ProductsStateType = {
  product: null,
  error: null,
  loading: false,
};

export const updateProduct = createAsyncThunk<
ProductTypeUpdate, 
  { id: number, updatedProduct: ProductTypeUpdate }, 
  { rejectValue: string }
>("product/updateProduct", async ({ id, updatedProduct }, thunksAPI) => {
  try {
    const response = await productsApi.editProductItem(id, updatedProduct);
    return response.data;
  } catch (error) {
    return thunksAPI.rejectWithValue("Server error");
  }
});

const updatedProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload ?? null;
    });
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.product = payload;
    });
  },
});

export const updatedProductActions = {
    ...updatedProductSlice.actions,
    updateProduct,
};

const updatedProductReducer = updatedProductSlice.reducer;
export default updatedProductReducer;
