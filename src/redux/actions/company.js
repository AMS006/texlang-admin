import axios from "axios";
import { setHeaders } from "../../helper";
import { logoutUser } from "./user";
import { companyRequest, setCompanies, setCompanyUsers, setError } from "../reducers/company";

export const getAllCompanies = () => async (dispatch) => {
    try {
        dispatch(companyRequest());
        setHeaders();
        const res = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/api/megdapadmin/company/all`,
        });
        dispatch(setCompanies(res?.data?.companies));
    } catch (error) {
        const statusCode = error?.response?.status;
        if(statusCode === 401){
            dispatch(logoutUser())
        }
        else{
            dispatch(setError(error?.response?.data?.message));
        }
    }
};

export const getCompanyUsers = (companyId) => async (dispatch) => {
    try {
        setHeaders();
        const res = await axios({
            method: "GET",
            url: `${import.meta.env.VITE_API_URL}/api/megdapadmin/company/users/${companyId}`,
            
        })
        dispatch(setCompanyUsers(res?.data?.users));
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