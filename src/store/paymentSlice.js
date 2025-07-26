import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  valid : false,
}

export const validSlice = createSlice({
  name: 'Payment',
  initialState,
  reducers: {
    changeValid : (state,actions) => {
        state.valid = actions.payload
    }
  },
})
export const { changeValid } = validSlice.actions

export default validSlice.reducer 