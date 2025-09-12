import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const testPapersSlice = createSlice({
    name: "TestPapersData",
    initialState,
    reducers: {
        setTestPapers: (state, action) => {
            state.data = action.payload
            //console.log(current(state));
            
        },
    }
})

export const {setTestPapers} = testPapersSlice.actions
export default testPapersSlice.reducer