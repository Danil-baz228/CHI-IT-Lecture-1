import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: typeof window !== "undefined" ? localStorage.getItem('token') : null, // Проверяем наличие `window`
        loading: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem('token', action.payload);
            }
        },
        logout: (state) => {
            state.token = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem('token');
            }
        },
    },
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;

