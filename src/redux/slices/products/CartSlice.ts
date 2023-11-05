import { createSlice } from '@reduxjs/toolkit'
import { Product } from './productSlice'

const data =
  localStorage.getItem('cart') === null ? [] : JSON.parse(String(localStorage.getItem('cart')))

type cartState = {
  cartItems: Product[]
}

const initialState: cartState = {
  cartItems: data
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    deleteItem: (state, action) => {
      const filteredItem = state.cartItems.filter((cartItem) => cartItem.id !== action.payload)
      state.cartItems = filteredItem
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    deleteAllItem: (state) => {
      state.cartItems = []
      localStorage.removeItem('cart')
    }
  }
})

export default cartSlice.reducer
export const { addToCart, deleteItem, deleteAllItem } = cartSlice.actions
