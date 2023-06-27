import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FarmsteadsType } from "../../types/farmsteadsTypes";
import farmsteadsApi from "../../api/farmstead/farmsteadsApi";

interface FarmsteadsStateType {
  farmstead: FarmsteadsType | null;
  error: string | null;
  loading: boolean;
}

const initialState: FarmsteadsStateType = {
  farmstead: null,
  error: null,
  loading: false,
};

const getFarmstead = createAsyncThunk<
  FarmsteadsType,
  number,
  { rejectValue: string }
>("farmstead/getFarmstead", async (farmsteadId, thunkApi) => {
  try {
    const response = await farmsteadsApi.getFarmsteadItem(farmsteadId);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue("Server error");
  }
});


const farmsteadSlice = createSlice({
  name: "farmstead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFarmstead.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFarmstead.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload ?? null;
    });
    builder.addCase(getFarmstead.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.farmstead = payload;
    });
    
  },
});

export const farmsteadActions = {
  ...farmsteadSlice.actions,
  getFarmstead,
};

const farmsteadReducer = farmsteadSlice.reducer;
export default farmsteadReducer;
