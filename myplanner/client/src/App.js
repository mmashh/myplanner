import React from 'react';
import Items from './components/Items.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import {
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventCalendar from "./components/calendar/calendarMain";

function App() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const isLoggedIn = function () {
    return cookies.get("Authorization") !== undefined;
  };

  const NavbarOptions = function () {
    const {pathname} = useLocation()
    if (isLoggedIn()) {
      return (
        <>
          <Nav.Item>
            <Link to="/calendar" className="app-navbar-link">
              <Button variant={pathname === '/calendar' ? 'primary':'secondary'} >
                Calendar
              </Button>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/items" className="app-navbar-link">
            <Button variant={pathname === '/items' ? 'primary':'secondary'} >
                Items
              </Button>
            </Link>
          </Nav.Item>
        </>
      );
    } else {
      return (
        <Nav.Item>
          <Link to="/login" className="app-navbar-link">
            Log In
          </Link>
        </Nav.Item>
      );
    }
  };

  const logout = function () {
    cookies.remove("Authorization");
    navigate("/");
  };

  const redirectIfNoUser = function (element) {
    return !isLoggedIn() ? <Navigate to="/login" /> : element;
  };

  const NavbarSignOutButton = function () {
    if (isLoggedIn()) {
      return (
        <Nav.Item className="me-4">
          <Button variant="danger" onClick={logout}>
            Log Out
          </Button>
        </Nav.Item>
      );
    }
  };

  return (
    <Container id="app-container" fluid>
      <Row md={3} id="app-navbar">
        <Col md={12}>
          <Navbar bg="dark" variant="dark" expand="md">
            <Navbar.Brand>
              <span id="app-navbar-header">MyPlanner</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="app-navbar-toggle" />
            <Navbar.Collapse id="app-navbar-toggle">
              <Nav className="me-auto">
                {NavbarOptions()}
              </Nav>
              <Nav>
                {NavbarSignOutButton()}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
      <Row md={9}>
        <Routes>
          <Route path="/" element={isLoggedIn() ? <Navigate to="/calendar"/> : <Navigate to="/login"/>}/>
          <Route path="/login" element={isLoggedIn() ? <Navigate to="/calendar"/> : <Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/items" element={redirectIfNoUser(<Items/>)}/>
          <Route path="/calendar" element={redirectIfNoUser(<EventCalendar/>)}/>
          <Route path="/*" element={<Navigate to="/calendar"/>}/>
        </Routes>
      </Row>
    </Container>
  );
}

export default App;
