import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUsers } from '../../redux/slices/products/UsersSlice';

export default function UserSidebar() {

  const {userData} = useSelector((state : RootState) => state.usersReducer);  

  const dispatch: AppDispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchUsers())
  },[])


  return (
    <aside className='user__sidebar'>
    <h2>User profile goes here</h2>
    <div className='adminSidebar__info'>
        <p>Name: {userData?.firstName + ' ' + userData?.lastName}</p>
        <p>Email: {userData?.email}</p>
    </div>
    <ul className='dashboard__links'>
      <li>
        <Link to="/user-dashboard/user/Userprofile">Profile</Link>
        </li>
      <li>
        <Link to="/user-dashboard/user/UserOrders">Orders</Link>
        </li>
    </ul>
  </aside>
  )
}
