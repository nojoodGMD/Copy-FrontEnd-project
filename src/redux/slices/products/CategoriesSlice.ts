import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../../api'
import Category from '../../../components/components/Category'

export type Category = {

    id:number
    name:string
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

export const fetchCategory = createAsyncThunk('category/fetchCategory',async()=>{
  const response = await api.get('/mock/e-commerce/categories.json')
  return response.data;
})

export const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    deleteCategory:(state, action)=>{
      const id = action.payload;
      const filteredCategories = state.categories.filter((category)=> category.id !== id);
      if(filteredCategories){
        state.categories = filteredCategories;
      }
  },
  addCategory:(state,action)=>{
    const newCategory = {id: new Date().getMilliseconds() , name: action.payload}
    state.categories.push(newCategory);
  },
  editedCategory:(state,action)=>{
    const id = action.payload.id;
    const foundCategory = state.categories.find((cat)=> cat.id === id);
    if(foundCategory){
      foundCategory.name = action.payload.name;
    }
  }
},
  extraReducers(builder){
    builder.addCase(fetchCategory.pending, (state)=>{
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(fetchCategory.fulfilled, (state, action)=>{
      state.categories = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchCategory.rejected, (state,action)=>{
      state.error = action.error.message || "Error"
      state.isLoading = false;
    })
  }
 
})

export const {deleteCategory, addCategory, editedCategory} = CategorySlice.actions;
export default CategorySlice.reducer
