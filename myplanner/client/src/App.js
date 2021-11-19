import React, { useState } from 'react';
import Items from './Items.js';
import Login from './Login.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav
} from 'react-bootstrap';

function App() {

  let [accessKey,setAccessKey] = useState();
  let navigate = useNavigate();

  const isLoggedIn = function() {
    return true;
    // return accessKey !== undefined
  }

  const loginCallback = function(key) {
    setAccessKey(key);
    navigate('/calendar');
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

  const redirectIfNoUser = function(element) {
    return (!isLoggedIn()) ? <Navigate to="/login"/> :  element;
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
                  {NavbarOptions()}
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
          <Row md={9}>
            <Routes>
              <Route exact path="/" element={redirectIfNoUser(<div>Calendar - WIP</div>)}/>
              {/* <Route path="/login" element={isLoggedIn() ? <Navigate to="/calendar"/> : <Login/>}/> */}
              <Route path="/login" element={<Login loginCallback={loginCallback}/>}/>
              <Route path="/items" element={redirectIfNoUser(<Items/>)}/>
              <Route path="/calendar" element={redirectIfNoUser(<div>calendar</div>)}/>
              <Route path="/*" element={redirectIfNoUser(<div>calendar</div>)}/>
            </Routes>
          </Row>
      </Container>
  );
}

export default App;
