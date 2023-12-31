import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    downloadProjectWorks: [],
    uploadProjectWorks: [],
    worksForUpdate:[],
    uploadedWorks:[],
    companyBillingWorks:[],
    generateInvoiceWorks:[],
    notAssignedWorks:[],
    error: null
};

const workSlice = createSlice({
    name: "work",
    initialState,
    reducers: {
        workRequest: (state) => {
            state.loading = true;
        },
        setDownloadProjectWork: (state, action) => {
            state.loading = false;
            state.downloadProjectWorks = action.payload;
        },
        setUploadProjectWork: (state, action) => {
            state.loading = false;
            state.uploadProjectWorks = action.payload;
        },
        setWorksForUpdate:(state,action) =>{
            state.loading = false;
            state.worksForUpdate = action.payload;
        },
        setUploadedWorks:(state,action) =>{
            state.loading = false;
            const currentWorks = current(state.uploadedWorks)
            state.uploadedWorks = [...currentWorks,action.payload.data];
        },
        setNotAssignedWorks:(state,action) =>{
            state.loading = false;
            state.notAssignedWorks = action.payload;
        },
        setCompanyBillingWorks:(state,action) =>{
            state.loading = false;
            state.companyBillingWorks = action.payload;
        },
        updateUserWorks:(state,action) =>{
            state.loading = false;
            const currentWorks = current(state.worksForUpdate)
            state.worksForUpdate = currentWorks.map((work)=>{
                if(work.id === action.payload.id)
                    return action.payload;
                return work;
            })
        },
        clearWorksForUpdate:(state)=>{
            state.loading = false;
            state.worksForUpdate = [];
        },
        clearDownloadProjectWoks:(state)=>{
            state.loading = false;
            state.downloadProjectWorks = []
        },
        clearUploadProjectWorks:(state)=>{
            state.loading = false;
            state.uploadProjectWorks = []
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
   workRequest,
    setDownloadProjectWork,
    setUploadProjectWork,
    setWorksForUpdate,
    setUploadedWorks,
    setCompanyBillingWorks,
    setNotAssignedWorks,
    updateUserWorks,
    clearWorksForUpdate,
    clearUploadProjectWorks,
    clearDownloadProjectWoks,
    setError,
} = workSlice.actions;
export default workSlice.reducer;