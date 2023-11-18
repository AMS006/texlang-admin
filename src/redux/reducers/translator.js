import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    sourceLanguages: [],
    targetLanguages: [],
    translators:[],
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
            state.targetLanguages = action.payload;
        },
        setTranslators: (state, action) => {
            state.translators = action.payload;
        },
    }
})

export const {
    sourceLanguageRequest,
    setSourceLanguages,
    setTargetLanguages,
    setTranslators
} = translatorReducer.actions

export default translatorReducer.reducer