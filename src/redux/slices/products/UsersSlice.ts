import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../../api'



export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLogin: boolean
  userData : null | User
}

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLogin:false,
  userData: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers',async()=>{
  const response = await api.get('/mock/e-commerce/users.json')
  return response.data;
})

export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login:(state,action)=>{
      state.isLogin = true;
      state.userData = action.payload;
    },
    logout:(state)=>{
      state.isLogin = false;
      state.userData = null;
    }
  },
  extraReducers(builder){
    builder.addCase(fetchUsers.pending, (state)=>{
      state.isLoading = true;
      state.error = null;
    })
    builder.addCase(fetchUsers.fulfilled, (state, action)=>{
      state.users = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchUsers.rejected, (state,action)=>{
      state.error = action.error.message || "Error"
      state.isLoading = false;
    })
  }
 
})

export const {login, logout} = UsersSlice.actions;
export default UsersSlice.reducer
