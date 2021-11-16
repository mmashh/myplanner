import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import notesApi from '../utils/notesApi';

function  Notecreate(props){
  let [newNote, setNewNote] = useState({
    note_title: "",
    note_body: ""
  });

  //Ref: https://stackoverflow.com/a/61243124
  function handleChange(e){
    const {name,value} = e.target
    setNewNote(function(prevState){
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  function clearNewNote(){
      setNewNote({
        note_title:  "",
        note_body: ""
      });
  }

  function clearHandler(){
    if (window.confirm("Are you sure you want to clear your current note?")){
      clearNewNote();
    }
  }

  function createNote(){
    notesApi.new(newNote);
    props.createCallback(); // update parent state
    clearNewNote();
  }

  return (
    <Container id="notecreate">
      <Col md={12}>
        <Row md={2} id="notecreate-header">
          <h2>Create Note</h2>
        </Row>
        <Row md={10}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control id="note-title" name="note_title" type="text" placeholder="Enter note title here..."  value={newNote.note_title} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Note</Form.Label>
              <Form.Control id="note-body" name="note_body" as="textarea" value={newNote.note_body} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="form-note-actions">
                <Button id="form-note-submit" variant="success" onClick={createNote}>Submit</Button>
                <Button id="form-note-submit" className="mx-4" variant="danger" onClick={clearHandler}>Clear</Button>
            </Form.Group>
          </Form>
        </Row>
      </Col>
    </Container>
  )
}

export default Notecreate;