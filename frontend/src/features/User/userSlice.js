
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetails : {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser : (state , action) => {
            state.userDetails = action.payload
        },
        updateIsVoted: (state) => {
            state.userDetails = {
              ...state.userDetails,
              isVoted: true,
            };
          },
    }
})

export const {addUser , updateIsVoted} = userSlice.actions;
export default userSlice.reducer