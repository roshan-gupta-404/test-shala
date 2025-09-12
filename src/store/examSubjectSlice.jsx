import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const examAndSubjectSlice = createSlice({
    name: "ExamAndSubjectData",
    initialState,
    reducers: {
        setExamAndSubject: (state, action) => {
            state.data = action.payload
            //console.log(current(state));
            
        },
    }
})

export const {setExamAndSubject} = examAndSubjectSlice.actions
export default examAndSubjectSlice.reducer