import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import farmsteadsApi from "../../api/farmstead/farmsteadsApi";
import { FarmsteadOrder } from "../../types/farmsteadsTypes";

interface FarmsteadStateType {
  order: FarmsteadOrder[];
  error?: string;
  loading: boolean;
}

const initialState: FarmsteadStateType = {
  order: [],
  error: undefined,
  loading: false,
};

const getFarmsteadOrder = createAsyncThunk<
  Array<FarmsteadOrder>,
  Array<FarmsteadOrder>,
  { rejectValue: string }
>("order/getFarmsteadOrder", async (data, thunkAPI) => {
  try {
    const response = await farmsteadsApi.getFarmsteadOrder(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error");
  }
});


const farmsteadOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFarmsteadOrder.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.order = [];
    });
    builder.addCase(getFarmsteadOrder.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getFarmsteadOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.order = payload;
    });
  },
});

export const farmsteadOrderActions = {
  ...farmsteadOrderSlice.actions,
  getFarmsteadOrder,
};

const farmsteadOrderReducer = farmsteadOrderSlice.reducer;
export default farmsteadOrderReducer;
