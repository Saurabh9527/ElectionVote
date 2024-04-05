
import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../features/User/userSlice.js'
import candidateReducer from '../features/Candidate/candidateSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    candidate: candidateReducer
  },
})