import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUsers } from '../../redux/slices/products/UsersSlice';

export default function AdminSidebar() {

  const {userData} = useSelector((state : RootState) => state.usersReducer);  

const dispatch: AppDispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchUsers())
},[])


  return (
    <aside className='admin__sidebar'>
    <h2>Admin Dashboard</h2>
    <div className='adminSidebar__info'>
        <p>Name: {userData?.firstName +' '+ userData?.lastName}</p>
        <p>Email: {userData?.email}</p>
    </div>
    <ul className='dashboard__links'>
      <li>
        <Link to="/admin-dashboard/admin/category">Category</Link>
        </li>
      <li>
        <Link to="/admin-dashboard/admin/products">Products</Link>
        </li>
      <li>
        <Link to="/admin-dashboard/admin/userList">Users List</Link>
        </li>
      <li>
        <Link to="/admin-dashboard/admin/Orders">Orders</Link>
        </li>
    </ul>
  </aside>
  )
}
