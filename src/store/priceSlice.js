import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  price : 0,
}

export const priceSlice = createSlice({
  name: 'Price',
  initialState,
  reducers: {
    changePriceStatue : (state,actions) => {
        state.price = actions.payload 
    }
  },
})
export const { changePriceStatue } = priceSlice.actions

export default priceSlice.reducer  