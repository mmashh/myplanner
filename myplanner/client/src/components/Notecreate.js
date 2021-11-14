import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';


function  Notecreate(){
  return (
    <Container id="notecreate">
      <Col md={12}>
        <Row md={2} id="notecreate-header">
          <h2>Create Note</h2>
        </Row>
        <Row md={10} id="notecreate-form">
          <Form>
            <Form.Group controlId="form-note-title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter note title here..."/>
            </Form.Group>
            <Form.Group controlId="form-note-body" className="mb-3">
              <Form.Label>Note</Form.Label>
              <Form.Control id="notecreate-form-body" as="textarea"/>
            </Form.Group>
            <Form.Group controlId="form-note-actions">
                <Button id="form-note-submit" variant="success">Submit</Button>
            </Form.Group>
          </Form>
        </Row>
      </Col>
    </Container>
  )
}


export default Notecreate;