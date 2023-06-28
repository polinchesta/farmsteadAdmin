import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FarmsteadsTypeUpdate } from "../../types/farmsteadsTypes";
import farmsteadsApi from "../../api/farmstead/farmsteadsApi";

interface FarmsteadsStateType {
  farmstead: FarmsteadsTypeUpdate | null;
  error: string | null;
  loading: boolean;
}

const initialState: FarmsteadsStateType = {
  farmstead: null,
  error: null,
  loading: false,
};

export const updateFarmstead = createAsyncThunk<
FarmsteadsTypeUpdate, 
  { id: number, updatedFarmstead: FarmsteadsTypeUpdate }, 
  { rejectValue: string }
>("farmstead/updateFarmstead", async ({ id, updatedFarmstead }, thunksAPI) => {
  try {
    const response = await farmsteadsApi.editFarmsteadItem(id, updatedFarmstead);
    return response.data;
  } catch (error) {
    return thunksAPI.rejectWithValue("Server error");
  }
});

const updatedFarmsteadSlice = createSlice({
  name: "farmstead",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateFarmstead.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateFarmstead.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload ?? null;
    });
    builder.addCase(updateFarmstead.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.farmstead = payload;
    });
  },
});

export const updatedFarmsteadActions = {
    ...updatedFarmsteadSlice.actions,
    updateFarmstead,
};

const updatedFarmsteadReducer = updatedFarmsteadSlice.reducer;
export default updatedFarmsteadReducer;
