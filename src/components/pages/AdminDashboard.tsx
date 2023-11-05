import AdminSidebar from '../components/AdminSidebar'

export default function AdminDashboard() {
  return (
    <div className="main-container">
      <div className="admin__container">
        <AdminSidebar />
        <div className="admin__main-content">Welcome Back! Choose from sidebar to show data.</div>
      </div>
    </div>
  )
}
