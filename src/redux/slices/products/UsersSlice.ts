import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { Order } from './AdminOrderSlice'

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
    console.log("response login in userslice",response)
    return response.data
  } catch (error) {
    console.log('error login userslice')
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
  return response
}



export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchTerm = action.payload
    },
    updateUser: (state, action) => {
      const { id, name, email } = action.payload
      const foundUser = state.users.find((user) => user._id === id)
      if (foundUser) {
        foundUser.name = name
        foundUser.email = email
        state.userData = foundUser
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLogin: state.isLogin,
            userData: state.userData
          })
        )
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.users = action.payload.payload.users
    })

    builder.addCase(login.fulfilled, (state, action) => {
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

export const { searchUser, updateUser } = UsersSlice.actions
export default UsersSlice.reducer

// == notes ===
// Update: login - logout - updateUser
// 1. listing users works
// 2. search users works
// 3. delete users
// 4. ban and unban users
// 5. register user
// 6. activate user
