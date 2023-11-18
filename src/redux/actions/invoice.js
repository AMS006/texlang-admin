import axios from "axios";
import { logoutUser } from "./user";
import { setHeaders } from "../../helper";
import { invoiceRequest, setAllInvoicesStatus, setApproveInvoiceWorks, setError, setGenerateInvoiceWorks, setSelectedInvoice } from "../reducers/invoice";

export const getGenerateInvoiceWorks = (companyId,start_date,end_date) => async(dispatch) =>{
    try {
        setHeaders();
        dispatch(setGenerateInvoiceWorks([]));
        dispatch(invoiceRequest())
        const res = await axios({
            method: "GET",
            url: `${import.meta.env.VITE_API_URL}/api/megdapadmin/invoice/generateInvoiceWorks?companyId=${companyId}&start_date=${start_date}&end_date=${end_date}`,
        })
        const works = res.data.works;
        
        dispatch(setGenerateInvoiceWorks(works));
    } catch (error) {
        const statusCode = error?.response?.status;
        if(statusCode === 401){
            dispatch(logoutUser())
        }
        else{
            dispatch(setError(error?.response?.data?.message));
        }
    }
}

export const getApproveInvoiceWorks = () => async(dispatch) =>{
    try {
        setHeaders();
        dispatch(setApproveInvoiceWorks([]));
        dispatch(invoiceRequest());

        const invoices = await axios({
            method:"GET",
            url:`${import.meta.env.VITE_API_URL}/api/megdapadmin/invoice/approvePending`
        });
        const works = invoices.data.invoices;
        dispatch(setApproveInvoiceWorks(works));
    } catch (error) {
        const statusCode = error?.response?.status;
        if(statusCode === 401){
            dispatch(logoutUser())
        }
        else{
            dispatch(setError(error?.response?.data?.message));
        }
    }
}

export const getInvoiceDetails = (invoiceId) => async(dispatch) =>{
    try {
        setHeaders();
        dispatch(invoiceRequest());

        const invoice = await axios({
            method:"GET",
            url:`${import.meta.env.VITE_API_URL}/api/megdapadmin/invoice/invoiceDetails/${invoiceId}`
        });

        const invoiceDetails = invoice.data.invoiceDetails;
        dispatch(setSelectedInvoice(invoiceDetails));
    } catch (error) {
        const statusCode = error?.response?.status;
        if(statusCode === 401){
            dispatch(logoutUser())
        }
        else{
            dispatch(setError(error?.response?.data?.message));
        }
    }
}

export const getAllInvoicesStatus = () => async(dispatch) =>{
    try {
        setHeaders();
        dispatch(invoiceRequest());

        const invoices = await axios({
            method:"GET",
            url:`${import.meta.env.VITE_API_URL}/api/megdapadmin/invoice/allInvoices`
        });
        const works = invoices.data.invoices;
        dispatch(setAllInvoicesStatus(works));
    } catch (error) {
        const statusCode = error?.response?.status;
        if(statusCode === 401){
            dispatch(logoutUser())
        }
        else{
            dispatch(setError(error?.response?.data?.message));
        }
    }
}
