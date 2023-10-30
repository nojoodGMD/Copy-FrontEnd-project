import {Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = ()=>{
    return <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">TECHNO</Navbar.Brand>
          <Nav className="me-auto">
              <div className="navigation">
              <Link to='/' >Home</Link>
              <Link to='/contact' >Contact</Link>
              <Link to='/admin-dashboard'>Admin</Link>
              <Link to='/user-dashboard'>User</Link>
              <Link to='/login'>Login</Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
}

export default Navigation;