import React from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'

function  Notecreate(){
  return (
    <Container id="notecreate">
      <Col md={12}>
        <Row md={2} id="notecreate-header">
          <h2>Create Note</h2>
        </Row>
        
      </Col>
    </Container>
  )
}


export default Notecreate;