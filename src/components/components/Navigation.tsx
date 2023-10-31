import {Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/slices/products/UsersSlice";

const Navigation = ()=>{

  const {isLogin , userData} = useSelector((state:RootState)=>state.usersReducer)

  const dispatch : AppDispatch = useDispatch()
  const handleLogout = ()=>{
    dispatch(logout())
  }
    return <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">TECHNO</Navbar.Brand>
          <Nav className="me-auto">
              <div className="navigation-bar">
                <Link to='/' >Home</Link>
                <Link to='/contact' >Contact</Link>
                {isLogin && userData?.role === 'visitor' && <Link to='/user-dashboard/user'>User Dashboard</Link>}
                {isLogin && userData?.role === 'admin' && <Link to='/admin-dashboard/admin'>Admin Dashboard</Link>}
                {!isLogin && <Link to='/Register' >Register</Link>}
                {!isLogin && <Link to='/login'>Login</Link>}
                {isLogin && <Link to='/' onClick={handleLogout}>Logout</Link>}
              </div>
          </Nav>
        </Container>
      </Navbar>
       
    </>
}

export default Navigation;