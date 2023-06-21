import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentType, FarmsteadsType } from '../../types/farmsteadsTypes';
import farmsteadsApi from '../../api/farmstead/farmsteadsApi';
import sendComment from '../../api/farmstead/postComments';

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

/* export const clearFarmstead = createAsyncThunk<void, void>(
    'farmstead/clearFarmstead',
    async (_, { dispatch }) => {
        dispatch({ type: 'farmstead/resetFarmstead' });
    }
);
 */
const getFarmstead = createAsyncThunk<FarmsteadsType, number, { rejectValue: string }>(
    'farmstead/getFarmstead',
    async (farmsteadId, thunkApi) => {
        try {
            const response = await farmsteadsApi.getFarmsteadItem(farmsteadId);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue('Server error');
        }
    }
);

const addComment = createAsyncThunk<void, { farmsteadId: number; comment: CommentType }>(
    'farmstead/addComment',
    async ({ farmsteadId, comment }, { rejectWithValue }) => {
        try {
            await sendComment(farmsteadId, comment);
        } catch (error) {
            return rejectWithValue('Server error');
        }
    }
);

const farmsteadSlice = createSlice({
    name: 'farmstead',
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
/*         builder.addCase(clearFarmstead.fulfilled, (state) => {
            state.farmstead = null;
            state.error = null;
            state.loading = false;
        }); */
        builder.addCase(addComment.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addComment.rejected, (state, { payload }: { payload: any }) => {
            state.loading = false;
            state.error = payload ?? null;
          });
          
        builder.addCase(addComment.fulfilled, (state) => {
            state.loading = false;
        });
    },
});

export const farmsteadActions = {
    ...farmsteadSlice.actions,
/*     clearFarmstead,
 */    addComment,
    getFarmstead,
};

const farmsteadReducer = farmsteadSlice.reducer;
export default farmsteadReducer;
