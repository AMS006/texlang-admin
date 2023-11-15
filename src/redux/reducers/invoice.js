import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    generateInvoiceWorks:[],
    approveInvoiceWorks:[],
    selectedInvoice:null,
    error:null
}

const invoiceSlice = createSlice({
    name:"invoice",
    initialState,
    reducers:{
        invoiceRequest:(state)=>{
            state.loading = true;
            state.selectedInvoice=null
        },
        setGenerateInvoiceWorks:(state,action)=>{
            state.loading = false;
            state.generateInvoiceWorks = action.payload;
        },
        setApproveInvoiceWorks:(state,action)=>{
            state.loading = false;
            state.approveInvoiceWorks = action.payload;
        },
        updateApprovedInvoiceWorks:(state,action)=>{
            const set = [...new Set(action.payload.map((work)=>work.id))];
            state.loading = false;
            const currentWorks = current(state.approveInvoiceWorks)
            state.approveInvoiceWorks = currentWorks.filter((work)=>{
                if(!set.includes(work.id))
                    return work;
            })
        },
        setSelectedInvoice : (state,action) =>{
            state.loading = false;
            state.selectedInvoice = action.payload;
        },
        setError:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.selectedInvoice = null;
        }
    }
});

export const {invoiceRequest,setGenerateInvoiceWorks,setApproveInvoiceWorks,setSelectedInvoice,updateApprovedInvoiceWorks,setError} = invoiceSlice.actions;
export default invoiceSlice.reducer;