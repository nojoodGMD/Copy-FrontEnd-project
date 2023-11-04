import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Outlet } from 'react-router-dom'
import Login from '../components/pages/Login'

export default function AdminProtectedRoute() {

    const {isLogin, userData} = useSelector((state : RootState)=> state.usersReducer)

  return (
    isLogin && userData?.role==='admin' ? <Outlet /> : <Login/>
  )
}
