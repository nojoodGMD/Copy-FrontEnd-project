import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
  return (
    <aside className='admin__sidebar'>
    <h2>Admin profile goes here</h2>
    <div className='adminSidebar__info'>
        <p>Nojood Othman</p>
        <p>NJ@gmail.com</p>
    </div>
    <ul>
      <li>
        <Link to="/dashboard/admin/category">Category</Link>
        </li>
      <li>
        <Link to="/dashboard/admin/products">Products</Link>
        </li>
      <li>
        <Link to="/dashboard/admin/userList">Users List</Link>
        </li>
    </ul>
  </aside>
  )
}
