    import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
    import { ProductOrder } from "../../types/productsTypes";
    import axios from "axios";
    import productsApi from "../../api/products/productsApi";

    interface ProductsStateType {
    order: ProductOrder[];
    error?: string;
    loading: boolean;
    }

    const initialState: ProductsStateType = {
    order: [],
    error: undefined,
    loading: false,
    };

    const getProductOrder = createAsyncThunk<
    Array<ProductOrder>,
    Array<ProductOrder>,
    { rejectValue: string }
    >("order/getProductOrder", async (data, thunkAPI) => {
    try {
        const response = await productsApi.getProductOrder(data)
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("Server error");
    }
    });

    const productOrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductOrder.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.order = [];
        });
        builder.addCase(getProductOrder.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        });
        builder.addCase(getProductOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.order = payload;
        });
    },
    });

    export const productOrderActions = {
    ...productOrderSlice.actions,
    getProductOrder,
    };

    const productOrderReducer = productOrderSlice.reducer;
    export default productOrderReducer;
