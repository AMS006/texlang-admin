import axios from "axios"
import { setHeaders } from "../../helper"
import { setAllTranslators, setReAssignTranslatorsWorks, setSelectedTranslator, setSourceLanguages, setTargetLanguages, setTranslators, sourceLanguageRequest, translatorRequest } from "../reducers/translator";
import { logoutUser } from "./user";
import { setError } from "../reducers/translator";

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
    try {
        setHeaders();
        dispatch(translatorRequest())
        const res = await axios({
            method:"GET",
            url:`${import.meta.env.VITE_API_URL}/api/megdapadmin/translator/all`
        })

        dispatch(setAllTranslators(res?.data?.translators))
    } catch (error) {
        if(error?.response?.status === 401){
            dispatch(logoutUser())
        }
        dispatch(setError(error?.response?.data?.message))
        dispatch(setTranslators([]))
    }
}

export const getTranslatorDetails = (translatorId) => async(dispatch) =>{
    try {
        setHeaders();
        dispatch(translatorRequest())
        const res = await axios({
            method:"GET",
            url:`${import.meta.env.VITE_API_URL}/api/megdapadmin/translator/translatorDetails/${translatorId}`
        })

        dispatch(setSelectedTranslator(res?.data))
    } catch (error) {
        if(error?.response?.status === 401){
            dispatch(logoutUser())
        }
        dispatch(setError(error?.response?.data?.message))
        dispatch(setTranslators([]))
    }
}

export const getReAssignTranslatorsWorks = (translatorId) => async(dispatch) =>{
    try {
        setHeaders();
        dispatch(translatorRequest())
        const res = await axios({
            method:"GET",
            url:`${import.meta.env.VITE_API_URL}/api/megdapadmin/translator/reAssignTranslatorsWorks`
        })

        dispatch(setReAssignTranslatorsWorks(res?.data?.works))
    } catch (error) {
        if(error?.response?.status === 401){
            dispatch(logoutUser())
        }
        dispatch(setError(error?.response?.data?.message))
        dispatch(setTranslators([]))
    }
}