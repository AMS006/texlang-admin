import axios from "axios";
import { setHeaders } from "../../helper";
import { companyRequest, setCompanies, setCompanyUsers, setError } from "../reducers/company";
import { setUser } from "../reducers/user";

export const getAllCompanies = () => async (dispatch) => {
    try {
        dispatch(companyRequest());
        setHeaders();
        const res = await axios({
        method: "GET",
        url: "http://localhost:4000/api/megdapadmin/company/all",
        });
        dispatch(setCompanies(res?.data?.companies));
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
};

export const getCompanyUsers = (companyId) => async (dispatch) => {
    try {
        setHeaders();
        const res = await axios({
            method: "GET",
            url: `http://localhost:4000/api/megdapadmin/company/users/${companyId}`,
            
        })
        dispatch(setCompanyUsers(res?.data?.users));
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