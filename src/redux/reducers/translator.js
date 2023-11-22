import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    sourceLanguages: [],
    targetLanguages: [],
    translators:[],
    translatorDetails:[]
}

const translatorReducer = createSlice({
    initialState,
    name: "translator",
    reducers: {
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
        setTranslatorsDetails: (state, action) => {
            state.loading = false;
            state.translatorDetails = action.payload;
        }
    }
})

export const {
    sourceLanguageRequest,
    setSourceLanguages,
    setTargetLanguages,
    setTranslators,
    setTranslatorsDetails
} = translatorReducer.actions

export default translatorReducer.reducer