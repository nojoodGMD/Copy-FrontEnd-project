import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  blocked: false
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
  const response = await api.get('/mock/e-commerce/users.json')
  return response.data
})

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
    deleteUser: (state, action) => {
      const filteredUsers = state.users.filter((user) => user.id !== action.payload)
      state.users = filteredUsers
    },
    blockUser: (state, action) => {
      const foundUser = state.users.find((user) => user.id === action.payload)
      if (foundUser) {
        foundUser.blocked = !foundUser.blocked
      }
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName, email } = action.payload
      const foundUser = state.users.find((user) => user.id === id)
      if (foundUser) {
        foundUser.firstName = firstName
        foundUser.lastName = lastName
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

export const { login, logout, register, searchUser, deleteUser, blockUser, updateUser } =
  UsersSlice.actions
export default UsersSlice.reducer
