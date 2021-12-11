import React, { useEffect } from 'react';
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

  
  const logoutUser = (e)=> {
    cookies.remove("Authorization");
    // call logout (when working on login stuff)
  }

  useEffect(()=>{
    const logoutOnWindowUnload = (e)=>{
      e.preventDefault();
      logoutUser();
    }
    window.addEventListener("beforeunload",logoutOnWindowUnload);

    return ()=>{
      window.removeEventListener("beforeunload",logoutOnWindowUnload);
    }

  },[])


  const isLoggedIn = function () {
    return cookies.get("Authorization") !== undefined;
  };

  const NavbarOptions = function () {
    const {pathname} = useLocation()
    if (isLoggedIn()) {
      return (
        <>
          <Nav.Item>
            <Link to="/calendar" >
              <Button className="app-navbar-button" variant={pathname === '/calendar' ? 'primary':'secondary'} >
                Calendar
              </Button>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/items">
            <Button className="app-navbar-button" variant={pathname === '/items' ? 'primary':'secondary'} >
                Items
              </Button>
            </Link>
          </Nav.Item>
        </>
      );
    } else {
      return (
        <Nav.Item>
          <Link to="/login">
            <Button className="app-navbar-button" variant="primary">Log In</Button>
          </Link>
        </Nav.Item>
      );
    }
  };

  const logout = function () {
    logoutUser();
    navigate("/");
  };

  const redirectIfNoUser = function (element) {
    return !isLoggedIn() ? <Navigate to="/login" /> : element;
  };

  const NavbarSignOutButton = function () {
    if (isLoggedIn()) {
      return (
        <Nav.Item>
          <Button variant="danger" className="app-navbar-button" onClick={logout}>
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
          <Navbar bg="dark" variant="dark" expand="md" sticky="top">
            <Navbar.Brand>
              <span id="app-navbar-header">MyPlanner</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="app-navbar-toggle" />
            <Navbar.Collapse id="app-navbar-toggle" className="justify-content-start">
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
