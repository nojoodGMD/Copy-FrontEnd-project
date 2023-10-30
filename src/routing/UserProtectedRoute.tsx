import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet } from 'react-router-dom'
import Login from '../components/pages/Login'

export default function UserProtectedRoute() {

    const {isLogin} = useSelector((state : RootState)=> state.usersReducer)

  return (
    isLogin ? <Outlet /> : <Login/>
  )
}
