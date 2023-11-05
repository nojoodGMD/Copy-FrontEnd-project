import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchOrders } from '../../redux/slices/products/AdminOrderSlice'
import Card from 'react-bootstrap/Card'
import AdminSidebar from '../components/AdminSidebar'
import { ToastContainer } from 'react-toastify'

export default function AdminOrderList() {
  const { error, isLoading, orders } = useSelector((state: RootState) => state.orderReducer)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  if (isLoading) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="main-container">
      <ToastContainer />
      <div className="admin__container">
        <AdminSidebar />
        <div className="admin__main-content">
          <h2>List of Orders</h2>
          {orders.length > 0 &&
            orders.map((order) => {
              return (
                <>
                  <Card>
                    <Card.Body>
                      <Card.Text>Product Id: {order.id}</Card.Text>
                      <Card.Text>Date of Purchase: {order.purchasedAt}</Card.Text>
                    </Card.Body>
                  </Card>
                </>
              )
            })}
        </div>
      </div>
    </div>
  )
}
