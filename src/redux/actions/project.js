import axios from "axios";
import { projectRequest, setError, setPaymentPendingProjects, setUserProjects } from "../reducers/project";
import { setHeaders } from "../../helper";
import { logoutUser } from "./user";

export const getUserProjects = (userId) => async (dispatch) => {
    try {
        setHeaders();
        dispatch(setUserProjects([]))
        dispatch(projectRequest())
        const res = await axios({
            method: "GET",
            url: `${import.meta.env.VITE_API_URL}/api/megdapadmin/project/user/${userId}`,
        })
        dispatch(setUserProjects(res?.data?.projects));
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

export const getPaymentPendingProjects = (companyId,start_date,end_date) => async (dispatch) => {
    try {
        setHeaders();
        dispatch(setPaymentPendingProjects([]));
        dispatch(projectRequest())
        const res = await axios({
            method: "GET",
            url: `${import.meta.env.VITE_API_URL}/api/megdapadmin/project/paymentPending?companyId=${companyId}&start_date=${start_date}&end_date=${end_date}`,
        })
        let projects = res.data.projects;
        
        dispatch(setPaymentPendingProjects(projects));
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