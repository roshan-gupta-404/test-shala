import { configureStore } from "@reduxjs/toolkit";
import  responseReducer from './responseSlice'
const store = configureStore({
    reducer:responseReducer,
})
 
export default store