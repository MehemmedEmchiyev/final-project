import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statue: false,
}

export const blackUiSlice = createSlice({
  name: 'BlackUi',
  initialState,
  reducers: {
    changeStatue : (state) => {
        state.statue = !state.statue
    }
  },
})
export const { changeStatue } = blackUiSlice.actions

export default blackUiSlice.reducer 