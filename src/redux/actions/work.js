import axios from "axios";
import { setHeaders } from "../../helper";
import { setCompanyBillingWorks, setDownloadProjectWork, setError, setUploadProjectWork, setWorksForUpdate, workRequest } from "../reducers/work";
import { setUser } from "../reducers/user";

export const getDownloadProjectWork =  (projectId) => async(dispatch) => {
    try {
        setHeaders();
        dispatch(setDownloadProjectWork([]))
        dispatch(workRequest())
        const res = await axios({
            method: "GET",
            url: `http://localhost:4000/api/megdapadmin/work/downloadProject/${projectId}`,
        })
        dispatch(setDownloadProjectWork(res?.data?.works))
    } catch (error) {
        const statusCode = error?.response?.status;
        if(statusCode === 401){
            localStorage.removeItem('authToken')
            dispatch(setUser(null));
        }
        else{
            dispatch(setError(error?.response?.data?.message));
        }
    }
}

export const getUploadProjectWork =  (projectId) => async(dispatch) => {
    try {
        setHeaders();
        dispatch(setUploadProjectWork([]))
        dispatch(workRequest())
        const res = await axios({
            method: "GET",
            url: `http://localhost:4000/api/megdapadmin/work/uploadProject/${projectId}`,
        })
        dispatch(setUploadProjectWork(res?.data?.works))
    } catch (error) {
        const statusCode = error?.response?.status;
        if(statusCode === 401){
            localStorage.removeItem('authToken')
            dispatch(setUser(null));
        }
        else{
            dispatch(setError(error?.response?.data?.message));
        }
    }
}

export const getUserWorksForUpdate = (projectId) => async(dispatch) =>{
    try {
        setHeaders();
        dispatch(setWorksForUpdate([]))
        dispatch(workRequest())
        const res = await axios({
            method: "GET",
            url: `http://localhost:4000/api/megdapadmin/work/userWorksForUpdate/${projectId}`,
        })
        dispatch(setWorksForUpdate(res?.data?.works))
    } catch (error) {
        const statusCode = error?.response?.status;
        if(statusCode === 401){
           localStorage.removeItem('authToken')
            dispatch(setUser(null));
        }
        else{
            dispatch(setError(error?.response?.data?.message));
        }
    }
}

export const getWorksForCompanyBilling = (companyId,start_date,end_date) => async (dispatch) => {
    try {
        setHeaders();
        dispatch(setCompanyBillingWorks([]));
        dispatch(workRequest())
        const res = await axios({
            method: "GET",
            url: `http://localhost:4000/api/megdapadmin/work/userWorksForCompanyBilling?companyId=${companyId}&start_date=${start_date}&end_date=${end_date}`,
        })
        const works = res.data.works;
        
        dispatch(setCompanyBillingWorks(works));
    } catch (error) {
        const statusCode = error?.response?.status;
        if(statusCode === 401){
            localStorage.removeItem('authToken')
            dispatch(setUser(null));
        }
        else{
            dispatch(setError(error?.response?.data?.message));
        }
    }
}