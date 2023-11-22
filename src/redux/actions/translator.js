import axios from "axios"
import { setHeaders } from "../../helper"
import { setSourceLanguages, setTargetLanguages, setTranslators, sourceLanguageRequest } from "../reducers/translator";
import { logoutUser } from "./user";

export const getSourceLanguages = () => async(dispatch) =>{
    try {
        setHeaders();

        dispatch(sourceLanguageRequest())
        dispatch(setSourceLanguages([]))
        const res = await axios({
            method:"GET",
            url:`${import.meta.env.VITE_API_URL}/api/megdapadmin/translator/sourceLanguages`
        })
        dispatch(setSourceLanguages(res?.data?.sourceLanguages))
    } catch (error) {
        if(error?.response?.status === 401){
            dispatch(logoutUser())
        }
        dispatch(setSourceLanguages([]))
    }
}

export const getTargetLanguages = (sourceLanguage) => async(dispatch) =>{
    try {
        setHeaders();
        dispatch(setTargetLanguages([]))
        dispatch(setTranslators([]))
        const res = await axios({
            method:"GET",
            url:`${import.meta.env.VITE_API_URL}/api/megdapadmin/translator/targetLanguages/?sourceLanguage=${sourceLanguage}`
        })
        dispatch(setTargetLanguages(res?.data?.targetLanguages))
    } catch (error) {
        if(error?.response?.status === 401){
            dispatch(logoutUser())
        }
        dispatch(setTargetLanguages([]))
    }
}

export const getTranslators = (sourceLanguage,targetLanguage) => async(dispatch) =>{
    try {
        setHeaders();
        const res = await axios({
            method:"GET",
            url:`${import.meta.env.VITE_API_URL}/api/megdapadmin/translator/?sourceLanguage=${sourceLanguage}&targetLanguage=${targetLanguage}`
        })
        dispatch(setTranslators(res?.data?.translators))
    } catch (error) {
        if(error?.response?.status === 401){
            dispatch(logoutUser())
        }
        dispatch(setTranslators([]))
    }
}

export const getAllTranslators = () => async(dispatch) =>{
}