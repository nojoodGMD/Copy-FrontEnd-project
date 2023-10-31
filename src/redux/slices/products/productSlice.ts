import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price:number
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  singleProduct: Product
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  singleProduct: {} as Product
}

export const fetchProducts = createAsyncThunk('products/fetchProducts',async()=>{
  const response = await api.get('/mock/e-commerce/products.json')
  return response.data;
})

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    findProduct : (state,action)=>{
      const id = action.payload
      const foundProduct = state.products.find((product)=> id === product.id)
      if(foundProduct){
        state.singleProduct = foundProduct;
      }
    }
  },
  extraReducers(builder){
    builder.addCase(fetchProducts.pending, (state)=>{
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(fetchProducts.fulfilled, (state, action)=>{
      state.products = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchProducts.rejected, (state,action)=>{
      state.error = action.error.message || "Error"
      state.isLoading = false;
    })
  }
 
})

export const {findProduct} = productSlice.actions;
export default productSlice.reducer
