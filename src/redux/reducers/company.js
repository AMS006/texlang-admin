import { createSlice, current } from "@reduxjs/toolkit";

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
        addCompany:(state,action) =>{
            state.loading = false;
            const currentCompanies = current(state.companies)
            state.companies = [...currentCompanies,action.payload];
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

export const { 
    companyRequest, 
    setCompanies,
    setCompanyUsers, 
    addCompany,
    setError 
} = companySlice.actions;
export default companySlice.reducer;


