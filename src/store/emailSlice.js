import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
}

export const emailSlice = createSlice({
  name: 'Email',
  initialState,
  reducers: {
    changeMail : (state,actions) => {
        state.email = actions.payload 
    }
  },
})
export const { changeMail } = emailSlice.actions

export default emailSlice.reducer  