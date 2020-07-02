import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {mainReducer} from "./reducers";

export const store = configureStore({
    reducer: mainReducer,
    middleware: getDefaultMiddleware()
});