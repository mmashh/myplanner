import React from 'react';
import Notes from './Notes.js';
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab
} from 'react-bootstrap';


function App() {
  return (
    <>
        <Container id="app-container" fluid>
            <Row md={2} id="app-header">
              <Col md={12}>
                <div className="test">
                  <h1>MyPlanner</h1>
                </div>
              </Col>
            </Row>
            <Row md={10}>
              <Notes className="test"></Notes>
            </Row>
        </Container>
    </>
  );
}

export default App;
