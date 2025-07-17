import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  flag: 0,
}

export const hamMenuSlice = createSlice({
  name: 'HamburgerMenu',
  initialState,
  reducers: {
    changeFlag : (state) => {
        state.flag = !state.flag
    }
  },
})
export const { changeFlag } = hamMenuSlice.actions

export default hamMenuSlice.reducer 