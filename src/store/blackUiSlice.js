import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statue: false,
}

export const blackUiSlice = createSlice({
  name: 'BlackUi',
  initialState,
  reducers: {
    changeStatue : (state,actions) => {
        state.statue = actions.payload
    }
  },
})
export const { changeStatue } = blackUiSlice.actions

export default blackUiSlice.reducer 