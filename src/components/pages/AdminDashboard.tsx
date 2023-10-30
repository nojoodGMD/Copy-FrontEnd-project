import React from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

export default function AdminDashboard() {
  return (
    <div className='admin__container'>
      <AdminSidebar/>
      <div className='admin__main-content'>Admin, main content goes here</div>
    </div>
  )
}
