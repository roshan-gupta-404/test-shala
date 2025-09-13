import { createSlice, current } from "@reduxjs/toolkit";
import { enableMapSet } from 'immer';

enableMapSet()

const initialState = {
    questionSet:[],
    responseSheet: [],
    testPaperName:'',
    testActive:false,
    testEndTime:null,
}

const responseSlice = createSlice({

    name: 'response',
    initialState,
    reducers: {
        createResponseSheet: (state, action) => {
            const length = action.payload.length
            state.responseSheet = Array.from({ length }).fill([])
            state.questionSet = action.payload.questions;
            state.testPaperName = action.payload.testPaperName;
            state.testEndTime = action.payload.duration*60000 + Date.now()

        },
        addResponse: (state, action) => {
            const mySet = new Set(state.responseSheet[action.payload.quesNum])
            mySet.add(action.payload.response)
            state.responseSheet[action.payload.quesNum] = Array.from(mySet)

        },
        clearResponse: (state, action) => {
            state.responseSheet[action.payload.quesNum] = []
        },
        removeResponse: (state, action)=>{
            const mySet = new Set(state.responseSheet[action.payload.quesNum])
            mySet.delete(action.payload.response)
            state.responseSheet[action.payload.quesNum] = Array.from(mySet)
            // state.responseSheet[action.payload.quesNum].delete(action.payload.response)

        },
        startTest:(state)=>{
            state.testActive = true 
            // console.log(current(state))
            
        },
        endTest:(state)=>{
            state.testActive = false
        }
    }
})

export const { addResponse, clearResponse, createResponseSheet, startTest, endTest, removeResponse } = responseSlice.actions
export default responseSlice.reducer;