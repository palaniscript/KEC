import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (<>
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={Link} to='/home'>User Management</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/home'>Home</Nav.Link>
          <Nav.Link as={Link} to='/manage-users'>Manage Users</Nav.Link>
          <Nav.Link as={Link} to='/contact'>Contact</Nav.Link>
        </Nav>

        <Nav>
          <NavDropdown title="My Account" id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/my-profile">My Profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/settings">
              Settings
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>

    <Outlet />
  </>
  )
};

export default Layout;