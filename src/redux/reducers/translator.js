import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    sourceLanguages: [],
    targetLanguages: [],
    translators:[],
    allTranslators:[],
    translatorDetails:[],
    selectedTranslatorDetails:undefined,
    selectedTranslatorLanguages:[],
    reAssignTranslatorsWorks:[],
    selectedTranslatorWorks:[],
    error: null
}

const translatorReducer = createSlice({
    initialState,
    name: "translator",
    reducers: {
        translatorRequest:(state) =>{
            state.loading = true;
        },
        sourceLanguageRequest: (state) => {
            state.loading = true;
        },
        setSourceLanguages: (state, action) => {
            state.loading = false;
            state.sourceLanguages = action.payload;
        },
        setTargetLanguages: (state, action) => {
            state.loading = false;
            state.targetLanguages = action.payload;
        },
        setTranslators: (state, action) => {
            state.loading = false;
            state.translators = action.payload;
        },
        setAllTranslators:(state,action) =>{
            state.loading = false;
            state.allTranslators = action.payload;
        },
        setTranslatorsDetails: (state, action) => {
            state.loading = false;
            state.translatorDetails = action.payload;
        },
        setSelectedTranslator: (state, action) => {
            state.loading = false;
            state.selectedTranslatorDetails = action.payload.translatorDetails;
            state.selectedTranslatorLanguages = action.payload.translatorLanguages;
            state.selectedTranslatorWorks = action.payload.translatorWorks;
        },
        setReAssignTranslatorsWorks: (state, action) => {
            state.loading = false;
            state.reAssignTranslatorsWorks = action.payload;
        },
        updateReAssignTranslatorsWorks: (state, action) => {
            state.loading = false;
            state.reAssignTranslatorsWorks = state.reAssignTranslatorsWorks.map((work) => {
                if(work._id === action.payload._id){
                    return {...work,translatorId:action.payload.translatorId, translatorName:action.payload.translatorName}
                }
                return work;
            });
        },
        setError:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        
        }
    }
})

export const {
    translatorRequest,
    sourceLanguageRequest,
    setSourceLanguages,
    setTargetLanguages,
    setTranslators,
    setTranslatorsDetails,
    setAllTranslators,
    setSelectedTranslator,
    setReAssignTranslatorsWorks,
    updateReAssignTranslatorsWorks,
    setError
} = translatorReducer.actions

export default translatorReducer.reducer