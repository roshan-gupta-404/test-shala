import { configureStore } from "@reduxjs/toolkit";
import  responseReducer from './responseSlice'
import  examAndSubjectReducer from './examSubjectSlice'
import testPapersReducer from './testPapersSlice'
const store = configureStore({
    reducer:{
        responseData:responseReducer,
        examAndSubjectData:examAndSubjectReducer,
        testPapersData:testPapersReducer

    },
})
 
export default store