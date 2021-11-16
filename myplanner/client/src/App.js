import React from 'react';
import Items from './Items.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav
} from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Container id="app-container">
          <Row md={3} id="app-navbar">
            <Col md={12}>
              <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Brand>
                  <span id="app-navbar-header">MyPlanner</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="app-navbar-toggle" />
                <Navbar.Collapse id="app-navbar-toggle">
                  <Nav.Item>
                    <Link to="/calendar" className="app-navbar-link">Calendar</Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/items" className="app-navbar-link">Items</Link>
                  </Nav.Item>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
          <Row md={9}>
            <Routes>
              <Route path="/items" element={<Items/>}/>
              <Route path="/calendar" element={<div>calendar</div>}/> {/* TODO */} 
            </Routes>
          </Row>
      </Container>
    </Router>
  );
}

export default App;
