import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { RootState } from '../redux/store'
import Login from '../components/pages/Login'

export default function UserProtectedRoute() {
  const { isLogin, userData } = useSelector((state: RootState) => state.usersReducer)

  return isLogin && userData?.isAdmin === false ? <Outlet /> : <Login />
}
