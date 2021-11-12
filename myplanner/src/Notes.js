import React from 'react';
import Notelist from './components/Notelist';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

let sampleData = {
  all_notes: [
      {
          note_id: 1,
          note_title: "Demo",
          note_body: "lorem ipsum text",
          date_created: "9/11/2021 14:25"
      },
      {
          note_id: 2,
          note_title: "Demo",
          note_body: "lorem ipsum text",
          date_created: "9/11/2021 14:25"
      },
      {
          note_id: 3,
          note_title: "Demo",
          note_body: "lorem ipsum text",
          date_created: "9/11/2021 14:25"
      }
  ]
};
let notes = sampleData.all_notes;

function Notes() {
  return (
    <Container fluid>
      <Row md={2}>
      </Row>
      <Row md={10}>
        <Col md={4}>
          <div className="test">
            Note Create
          </div>
        </Col>
        <Col md={8}>
            <Notelist notes={notes}></Notelist>
        </Col>
      </Row>
    </Container>
  )
}

export default Notes;