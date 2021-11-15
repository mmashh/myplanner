import React, {
  useEffect,
  useState
} from 'react';
import Notelist from './components/Notelist'; 
import Notecreate from './components/Notecreate';
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import notesApi from './utils/notesApi';

function Notes() {
  let [notes, setNotes] = useState([]);

  useEffect(function(){
    setNotes(notesApi.all());
  },[])

  // Ref: https://stackoverflow.com/a/54621059
  function updateNoteState(){
    var notes = notesApi.all();
    setNotes([...notes]);
  }

  return (
    <Container fluid>
      <Row md={12}>
        <Col md={4}>
          <Notecreate createCallback={updateNoteState}/>
        </Col>
        <Col md={8}>
          <Notelist notes={notes} callback={updateNoteState}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Notes;