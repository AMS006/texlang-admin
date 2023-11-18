import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    userProjects: [],
    paymentPendingProjects: [],
    error: null
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        projectRequest: (state) => {
            state.loading = true;
        },
        setUserProjects: (state, action) => {
            state.loading = false;
            state.userProjects = action.payload;
        },
        setPaymentPendingProjects: (state, action) => {
            state.loading = false;
            state.paymentPendingProjects = action.payload;
        },
        clearPaymentPendingProjects: (state) => {
            state.loading = false;
            state.paymentPendingProjects = [];
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    projectRequest, 
    setUserProjects, 
    setPaymentPendingProjects,
    clearPaymentPendingProjects,
    setError 
} = projectSlice.actions;
export default projectSlice.reducer;