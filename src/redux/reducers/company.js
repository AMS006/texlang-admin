import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    companies: [],
    companyUsers: [],
    error: null
};
const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        companyRequest: (state) => {
            state.loading = true;
        },
        setCompanies: (state, action) => {
            state.loading = false;
            state.companies = action.payload;
        },
        setCompanyUsers: (state, action) => {
            state.loading = false
            state.companyUsers = action.payload;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { companyRequest, setCompanies,setCompanyUsers, setError } = companySlice.actions;
export default companySlice.reducer;


