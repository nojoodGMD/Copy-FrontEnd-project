import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Category from '../../../components/components/Category'
import axios from 'axios'

export type Category = {
  _id: string
  slug: string
  name: string
}

export type CategoryState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false
}

const baseURL = 'http://localhost:3002/api/categories'

export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
  const response = await axios.get(`${baseURL}`)
  return response.data.payload
})

export const addCategory = async (name : string) => {
    const response = await axios.post(`${baseURL}`,{name})
    return response
}
export const deleteCategory = async (slug : string) => {
    const response = await axios.delete(`${baseURL}/${slug}`)
    return response
}
export const updateCategory = async (_id : string , name : string) => {
    const response = await axios.put(`${baseURL}/${_id}`,{name})
    return response
}

export const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.error = action.error.message || 'Error'
      state.isLoading = false
    })
  }
})

export default CategorySlice.reducer
