import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FarmsteadsType,
  FarmsteadsFilterType,
} from "../../types/farmsteadsTypes";
import farmsteadsApi from "../../api/farmstead/farmsteadsApi";

interface FarmsteadsStateType {
  farmsteads: Array<FarmsteadsType>;
  error?: string;
  loading: boolean;
}

const initialState: FarmsteadsStateType = {
  farmsteads: [],
  error: undefined,
  loading: false,
};

const getFarmsteadsList = createAsyncThunk<
  Array<FarmsteadsType>,
  FarmsteadsFilterType,
  { rejectValue: string }
>("farmsteads/getFarmsteadList", async (data, thunksApi) => {
  try {
    const response = await farmsteadsApi.getFarmsteadsList(data);
    return response.data;
  } catch {
    return thunksApi.rejectWithValue("Server error");
  }
});

const editFarmstead = createAsyncThunk<
  FarmsteadsType,
  { id: number; updatedFarmstead: FarmsteadsType },
  { rejectValue: string }
>("farmsteads/editFarmstead", async ({ id, updatedFarmstead }, thunkAPI) => {
  try {
    const response = await farmsteadsApi.editFarmsteadItem(
      id,
      updatedFarmstead
    );
    return response.data;
  } catch {
    return thunkAPI.rejectWithValue("Server error");
  }
});

const deleteFarmstead = createAsyncThunk<void, number, { rejectValue: string }>(
  "farmsteads/deleteFarmstead",
  async (id, thunkAPI) => {
    try {
      await farmsteadsApi.deleteFarmsteadItem(id);
    } catch {
      return thunkAPI.rejectWithValue("Server error");
    }
  }
);

const farmsteadsSlice = createSlice({
  name: "farmsteads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFarmsteadsList.pending, (state) => {
      state.loading = true;
      state.error = undefined;
      state.farmsteads = [];
    });
    builder.addCase(getFarmsteadsList.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getFarmsteadsList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.farmsteads = payload;
    });
    builder.addCase(editFarmstead.pending, (state) => {
        state.loading = true;
        state.error = undefined;
    });
    
    builder.addCase(editFarmstead.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
    });
    
    builder.addCase(editFarmstead.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.farmsteads.findIndex((farmstead) => farmstead.id === payload.id);
        if (index !== -1) {
            state.farmsteads[index] = payload;
        }
    });
    
    builder.addCase(deleteFarmstead.pending, (state) => {
        state.loading = true;
        state.error = undefined;
    });
    
    builder.addCase(deleteFarmstead.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
    });
    
    builder.addCase(deleteFarmstead.fulfilled, (state, { meta: { arg: id } }) => {
        state.loading = false;
        state.farmsteads = state.farmsteads.filter((farmstead) => farmstead.id !== id);
    });
  },
});

export const farmsteadsActions = {
  ...farmsteadsSlice.actions,
  getFarmsteadsList,
  deleteFarmstead,
  editFarmstead,
};

const farmsteadsReducer = farmsteadsSlice.reducer;
export default farmsteadsReducer;
