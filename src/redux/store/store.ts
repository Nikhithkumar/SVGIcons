import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productDataSlice from "../reducers/productDataSlice";

const reducers = combineReducers({
    productData: productDataSlice
});

const store = configureStore({
    reducer: reducers
});

export default store;

export type RootState = ReturnType<typeof store.getState>;