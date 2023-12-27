import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

import { logout } from '../../redux/slices/products/UsersSlice'
import { AppDispatch, RootState } from '../../redux/store'
import CartIcon from './CartIcon'

const Navigation = () => {
  const { isLogin, userData } = useSelector((state: RootState) => state.usersReducer)
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)

  const dispatch: AppDispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">TECHNO</Navbar.Brand>
          <Nav className="me-auto">
            <div className="navigation-bar">
              <Link to="/">Home</Link>
              <Link to="/contact">Contact</Link>
              {isLogin && userData?.isAdmin === false && (
                <Link to="/user-dashboard/user">User Dashboard</Link>
              )}
              {isLogin && userData?.isAdmin === true && (
                <Link to="/admin-dashboard/admin">Admin Dashboard</Link>
              )}
              {!isLogin && <Link to="/register">Register</Link>}
              {!isLogin && <Link to="/login">Login</Link>}
              {isLogin && (
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              )}
            </div>
          </Nav>
          {isLogin && (
            <Link to="/cart">
              <CartIcon value={cartItems.length} />
            </Link>
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
