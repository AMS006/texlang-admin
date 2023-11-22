import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    generateInvoiceWorks:[],
    approveInvoiceWorks:[],
    allInvoicesStatus:[],
    approvePendingInvoices:[],
    invoicesToSend:[],
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
        setAllInvoicesStatus:(state,action)=>{
            state.loading = false;
            state.allInvoicesStatus = action.payload;
        },
        setSelectedInvoice : (state,action) =>{
            state.loading = false;
            state.selectedInvoice = action.payload;
        },
        setInvoicesToSend:(state,action)=>{
            state.loading = false;
            state.invoicesToSend = action.payload;
        },
        setApprovePendingInvoices:(state,action)=>{
            state.loading = false;
            state.approvePendingInvoices = action.payload;
        },
        updateInvoiceStatus:(state,action)=>{
           
            const currentStatus = current(state.allInvoicesStatus);
         
            const updatedInvoices = currentStatus.map((invoice)=>{
                if(invoice.id === action.payload.id){
                    return {...invoice,status:action.payload.status}
                }
                return invoice;
            });    
            state.allInvoicesStatus = updatedInvoices;
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
        setError:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.selectedInvoice = null;
        }
    }
});

export const {
    invoiceRequest,
    setGenerateInvoiceWorks,
    setApproveInvoiceWorks,
    setAllInvoicesStatus,
    setSelectedInvoice,
    setInvoicesToSend,
    setApprovePendingInvoices,
    updateInvoiceStatus,
    updateApprovedInvoiceWorks,
    setError
} = invoiceSlice.actions;
export default invoiceSlice.reducer;