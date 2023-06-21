import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    token: null,
    id: null,
    isAutef: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.isAutef = action.payload.isAutef;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            /* state.isAutef = null; */
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
