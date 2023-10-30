import React from 'react'
import UserSidebar from './UserSidebar'

export default function UserProfile() {
  return (
    <div className='user__container'>
      <UserSidebar/>
      <div className='user__main-content'>User Profile, main content goes here</div>
    </div>
  )
}
