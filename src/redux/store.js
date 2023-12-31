import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import companyReducer from "./reducers/company";
import projectReducer from "./reducers/project";
import workReducer from "./reducers/work";
import invoiceReducer from "./reducers/invoice";
import translatorReducer from "./reducers/translator";

const store = configureStore({
    reducer: {
        company: companyReducer,
        user: userReducer,
        project: projectReducer,
        work: workReducer,
        invoice: invoiceReducer,
        translator:translatorReducer,
    }
});

export default store;