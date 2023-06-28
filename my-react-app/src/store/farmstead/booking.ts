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


const getFarmsteadBooking = createAsyncThunk<
  Array<FarmsteadOrder>,
  Array<FarmsteadOrder>,
  { rejectValue: string }
>("booking/getFarmsteadBooking", async (data, thunkAPI) => {
  try {
    const response = await farmsteadsApi.getFarmsteadBooking(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Server error");
  }
});

const farmsteadBookingSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFarmsteadBooking.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.order = [];
    });
    builder.addCase(getFarmsteadBooking.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getFarmsteadBooking.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.order = payload;
    });
  },
});

export const farmsteadBookingActions = {
  ...farmsteadBookingSlice.actions,
  getFarmsteadBooking
};

const farmsteadBookingReducer = farmsteadBookingSlice.reducer;
export default farmsteadBookingReducer;
