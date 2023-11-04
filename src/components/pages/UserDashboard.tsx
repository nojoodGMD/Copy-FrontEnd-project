import React from 'react'
import UserSidebar from '../components/UserSidebar'

export default function UserDashboard() {
  return (
    <>
    <div className="main-container">
      <div className='user__container'>
      <UserSidebar/>
      <div className='user__main-content'>Welcome Back! Choose from sidebar to show data.</div>
    </div>
    </div>
    </>
  )
}
