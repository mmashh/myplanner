import React from 'react';
import Notelist from './components/Notelist'; 
import Notecreate from './components/Notecreate';
import {
  Container,
  Row,
  Col,
  Form
} from 'react-bootstrap';


function getSampleData(n=3) {
  var notes = [];
  for (var i = 0; i < n; i++){
    notes.push({
      note_id: 1,
      note_title: "Demo",
      note_body: "lorem ipsum text",
      date_created: "9/11/2021 14:25"
    });
  }
  return notes
}
let notes = getSampleData(15);

function Notes() {
  return (
    <Container fluid>
      <Row md={12}>
        <Col md={4}>
          <Notecreate/>
        </Col>
        <Col md={8}>
          <Notelist notes={notes}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Notes;