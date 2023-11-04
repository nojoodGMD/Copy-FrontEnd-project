import React from 'react'
import UserSidebar from '../components/UserSidebar'

export default function UserDashboard() {
  return (
    <>
    <div className="main-container">
      <div className='user__container'>
      <UserSidebar/>
      <div className='user__main-content'>User, main content goes here</div>
    </div>
    </div>
    </>
  )
}
