import React, { useState } from 'react';
import Items from './Items.js';
import Login from './Login.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate
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

function App() {

  const cookies = new Cookies();
  const navigate = useNavigate();

  const isLoggedIn = function() {
    return cookies.get('Authorization') !== undefined;
  }

  const NavbarOptions = function() {
    if (isLoggedIn()) {
      return (
        <>
          <Nav.Item>
            <Link to="/calendar" className="app-navbar-link">Calendar</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/items" className="app-navbar-link">Items</Link>
          </Nav.Item>
        </>
      );
    } else {
      return (
        <Nav.Item>
          <Link to="/login" className="app-navbar-link">Log In</Link>
        </Nav.Item>
      )
    }
  }

  const logout = function() { 
    cookies.remove('Authorization');
    navigate('/');
  }

  const redirectIfNoUser = function(element) {
    return (!isLoggedIn()) ? <Navigate to="/login"/> :  element;
  }

  const NavbarSignOutButton = function(){
    if (isLoggedIn()){
      return (
        <Nav.Item className="me-4">
          <Button variant="secondary" onClick={logout}>Log Out</Button>
        </Nav.Item>
      )
    }
  }

  return (
    <Container id="app-container">
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
          <Route path="/register" element={<div>Register</div>}/>
          <Route path="/items" element={redirectIfNoUser(<Items/>)}/>
          <Route path="/calendar" element={redirectIfNoUser(<div>calendar</div>)}/>
          <Route path="/*" element={redirectIfNoUser(<div>calendar</div>)}/>
        </Routes>
      </Row>
    </Container>
  );
}

export default App;
