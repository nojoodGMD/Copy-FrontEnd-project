import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchUsers } from '../../redux/slices/products/UsersSlice'

export default function UserSidebar() {
  const { userData } = useSelector((state: RootState) => state.usersReducer)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <aside className="user__sidebar">
      <h2>User Dashboard</h2>
      <div className="admin-sidebar__info">
        <p>Name: {userData?.firstName + ' ' + userData?.lastName}</p>
        <p>Email: {userData?.email}</p>
      </div>
      <ul className="dashboard__links">
        <li>
          <Link to="/user-dashboard/user/userProfile">Profile</Link>
        </li>
        <li>
          <Link to="/user-dashboard/user/userOrders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}
