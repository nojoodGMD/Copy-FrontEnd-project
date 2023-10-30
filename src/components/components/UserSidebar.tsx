import React from 'react'
import { Link } from 'react-router-dom'

export default function UserSidebar() {
  return (
    <aside className='user__sidebar'>
    <h2>User profile goes here</h2>
    <div className='adminSidebar__info'>
        <p>Nojood Othman</p>
        <p>Age : 23</p>
        <p>NJ@gmail.com</p>
    </div>
    <ul>
      <li>
        <Link to="/dashboard/user/Userprofile">Profile</Link>
        </li>
    </ul>
  </aside>
  )
}
