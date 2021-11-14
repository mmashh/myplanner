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
            <Row md={3} id="app-header">
              <Col md={12}>
                <h1>MyPlanner</h1>
              </Col>
            </Row>
            <Row md={9}>
              <Notes></Notes>
            </Row>
        </Container>
    </>
  );
}

export default App;
