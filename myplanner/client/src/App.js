import React from 'react';
import Items from './Items.js';
import Login from './Login.js';
import Register from './Register.js';
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
import { NavBar } from "./components/navBar.js";

function App(props) {
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
    <div className="maincontainer">
      <Container id="app-container">
        <Row md={3} id="app-navbar">
          <Col md={12}>
            <NavBar options={NavbarOptions} signout={NavbarSignOutButton}/>
          </Col>
        </Row>
        <Row md={9}>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn() ? (
                  <Navigate to="/calendar" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={isLoggedIn() ? <Navigate to="/calendar" /> : <Login />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/items" element={redirectIfNoUser(<Items />)} />
            <Route
              path="/calendar"
              element={redirectIfNoUser(<EventCalendar />)}
            />
            <Route path="/*" element={redirectIfNoUser(<div>calendar</div>)} />
          </Routes>
        </Row>
      </Container>
    </div>
  );
}

export default App;
