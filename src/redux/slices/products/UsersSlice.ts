import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { Order } from './AdminOrderSlice'

axios.defaults.withCredentials = true

export type User = {
  _id: string
  name: string
  isAdmin: boolean
  isBanned: boolean
  email: string
  password: string
  image: string
  phone: string
  orders: Order[] //update later
}

export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  isLogin: boolean
  userData: null | User
  searchTerm: string
  blocked: boolean
}

export const baseURL = 'http://localhost:3002/api' 

const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLogin: data.isLogin,
  userData: data.userData,
  searchTerm: '',
  blocked: false
}


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get<User[]>(`${baseURL}/users`)
    return response.data
})

export const login = createAsyncThunk('users/login', async (userData:object) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`,userData)
    return response.data
  } catch (error) {
    console.log(error)
  }
    
})

export const logout = createAsyncThunk('users/logout', async () => {
  try {
    const response = await axios.post(`${baseURL}/auth/logout`)
    return response.data
  } catch (error) {
    console.log(error)
  }
    
})

export const updateUser =  createAsyncThunk( 'users/updateUser',async (newUserData : object) => {
  try {
    await axios.put(`${baseURL}/users/${newUserData._id}`,newUserData)
    return newUserData;
  } catch (error) {
    console.log(error)
  }
})

export const getOneUser = createAsyncThunk('users/getOneUser', async (userId : string) => {
  try {
    const response = await axios.get(`${baseURL}/users/${userId}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
    
})

export const createUser =  async (newUserData : FormData) => {
  const response = await axios.post(`${baseURL}/users/register`,newUserData)
  return response
}

export const activateUser =  async (token : string) => {
    const response = await axios.post(`${baseURL}/users/activate`,{token})
    return response.data
}

export const deleteUser =  async (_id : string) => {
  const response = await axios.delete(`${baseURL}/users/${_id}`)
  return response
}

export const banUser =  async (_id : string) => {
  const response = await axios.put(`${baseURL}/users/ban/${_id}`)
  return response
}

export const unbanUser =  async (_id : string) => {
  const response = await axios.put(`${baseURL}/users/unban/${_id}`)
  return response
}

export const changeRole =  async (_id : string) => {
  const response = await axios.put(`${baseURL}/users/changeRole/${_id}`)
  return response.data
}

export const forgotPassword =  async (email : object ) => {
  try {
    const response = await axios.post(`${baseURL}/users/forget-password`,email)
    return response
  } catch (error) {
    console.log(error)
  } 
}

export const resetPassword =  async (data : object) => {
  try {
    const response = await axios.put(`${baseURL}/users/reset-password`,data)
    return response
  } catch (error) {
    console.log(error)
  } 
}






export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchTerm = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.users = action.payload.payload.users
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.userData.name = action.payload.name
        state.userData.email = action.payload.email
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLogin: state.isLogin,
            userData: state.userData
          })
        )
      
    })

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isLogin = true
      state.userData = action.payload.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLogin: state.isLogin,
          userData: state.userData
        })
      )
    })
    builder.addCase(getOneUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isLogin = true
      state.userData = action.payload.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLogin: state.isLogin,
          userData: state.userData
        })
      )
    })

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false
      state.isLogin = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLogin: state.isLogin,
          userData: state.userData
        })
      )
    })
    builder.addMatcher((action)=>action.type.endsWith('/rejected'), (state, action) => {
      state.error = action.error.message || 'Error'
      state.isLoading = false
    })
    builder.addMatcher((action)=>action.type.endsWith('/pending') ,(state) => {
      state.isLoading = true
      state.error = null
    })
  }
})

export const { searchUser } = UsersSlice.actions
export default UsersSlice.reducer
