import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: false,
}

export const searchSlice = createSlice({
  name: 'Search',
  initialState,
  reducers: {
    changeSearch : (state) => {
        state.search = !state.search
    }
  },
})
export const { changeSearch } = searchSlice.actions

export default searchSlice.reducer  