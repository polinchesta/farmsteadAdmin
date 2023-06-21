import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FarmsteadsType, FarmsteadsFilterType } from '../../types/farmsteadsTypes';
import farmsteadsApi from '../../api/farmstead/farmsteadsApi';

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
>('farmsteads/getFarmsteadList', async (data, thunksApi) => {
    try {
        const response = await farmsteadsApi.getFarmsteadsList(data);
        return response.data;
    } catch {
        return thunksApi.rejectWithValue('Server error');
    }
});

const farmsteadsSlice = createSlice({
    name: 'farmsteads',
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
    },
});

export const farmsteadsActions = {
    ...farmsteadsSlice.actions,
    getFarmsteadsList,
};

const farmsteadsReducer = farmsteadsSlice.reducer;
export default farmsteadsReducer;
