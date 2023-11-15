import axios from "axios";
import { setError, setUser, userRequest } from "../reducers/user";
import { setHeaders } from "../../helper";

export const loginUser = (data) => async(dispatch) => {
    try {
        dispatch(userRequest())
        const res = await axios({
            method: "POST",
            url: "http://localhost:4000/api/megdapadmin/user/login",
            data,
        })
        localStorage.setItem('authToken', res.data.token)
        dispatch(setUser(res.data.user));
    } catch (error) {
        dispatch(setError(error?.response?.data?.message));
    }
}
export const logoutUser = () =>  (dispatch) => {
    localStorage.removeItem('authToken')
    dispatch(setUser(null));
}
export const getUser = () => async (dispatch) => {
    try {
        dispatch(userRequest())
        setHeaders();
        const res = await axios({
            method: "GET",
            url: "http://localhost:4000/api/megdapadmin/user",
            
        })
        dispatch(setUser(res?.data?.user));
    } catch (error) {
        localStorage.removeItem('authToken')
        dispatch(setUser(null));
    }
}

