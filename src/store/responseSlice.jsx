import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    questionSet:[],
    responseSheet: [],
    testActive:false,
}

const responseSlice = createSlice({

    name: 'response',
    initialState,
    reducers: {
        createResponseSheet: (state, action) => {
            const length = action.payload.length;
            state.responseSheet = Array.from({ length }).fill(null);
            state.questionSet = action.payload.questions;
            console.log(current(state));
        },
        addResponse: (state, action) => {
            state.responseSheet[action.payload.quesNum] = action.payload.response
            console.log(current(state));
        },
        clearResponse: (state, action) => {
            state.responseSheet[action.payload.quesNum] = null
        },
        startTest:(state)=>{
            state.testActive = true
        },
        endTest:(state)=>{
            state.testActive = false
        }
    }
})

export const { addResponse, clearResponse, createResponseSheet, startTest, endTest } = responseSlice.actions;
export default responseSlice.reducer;