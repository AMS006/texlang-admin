import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: undefined,
        loading: false,
        error:null,
    },
    reducers: {
        userRequest: (state) => {
            state.loading = true
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false
        },
       
        clearError: (state) => {
            state.error = null;
            state.loading = false
        },
        setError: (state,action) => {
            state.user = null;
            state.error = action.payload;
            state.loading = false;
        }
    },
});

export const { userRequest, setUser,setError, clearError } = userSlice.actions;
export default userSlice.reducer;