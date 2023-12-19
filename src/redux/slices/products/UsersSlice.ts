import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { Order } from './AdminOrderSlice'

// export type oldUser = {
//   id: number
//   firstName: string
//   lastName: string
//   email: string
//   password: string
//   role: string
//   blocked: false
// }

export type UserApi = {
  _id: string
  name: string
  isAdmin: boolean
  isBanned: boolean
  email: string
  image: string
  phone: string
  orders: Order[] //update later
}

export type UserState = {
  users: UserApi[]
  error: null | string
  isLoading: boolean
  isLogin: boolean
  userData: null | UserApi
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
    const response = await axios.get(`${baseURL}/users`)
    return response.data.payload.users
})

export const deleteUser =  async (_id : string) => {
  const response = await axios.delete(`${baseURL}/users/${_id}`)
  return response
}


export const UsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLogin: state.isLogin,
          userData: state.userData
        })
      )
    },
    logout: (state) => {
      state.isLogin = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLogin: state.isLogin,
          userData: state.userData
        })
      )
    },
    register: (state, action) => {
      const newUser = action.payload
      state.users.push(newUser)
    },
    searchUser: (state, action) => {
      state.searchTerm = action.payload
    },
    blockUser: (state, action) => {
      const foundUser = state.users.find((user) => user._id === action.payload)
      if (foundUser) {
        foundUser.isBanned = !foundUser.isBanned
      }
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
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.users = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message || 'Error'
      state.isLoading = false
    })
  }
})

export const { login, logout, register, searchUser, blockUser, updateUser } =
  UsersSlice.actions
export default UsersSlice.reducer

// == notes ===
// Update: login - logout - register - blockUser - updateUser
// 1. listing users works
// 2. search users works
// 3. delete users