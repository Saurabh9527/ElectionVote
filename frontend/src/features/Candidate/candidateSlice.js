

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  candDetails : []
}

export const candidateSlice = createSlice({
    name: "candidate",
    initialState,
    reducers: {
        addCandidate : (state , action) => {
            state.candDetails = action.payload
        }
    }
})

export const {addCandidate} = candidateSlice.actions;
export default candidateSlice.reducer