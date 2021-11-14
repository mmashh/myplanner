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

  function createNote(){
    notesApi.new(newNote);
    props.createCallback(); // update parent state
  }

  return (
    <Container id="notecreate">
      <Col md={12}>
        <Row md={2} id="notecreate-header">
          <h2>Create Note</h2>
        </Row>
        <Row md={10}>
          <Form>
            <Form.Group controlId="form-note-title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter note title here..." name="note_title" value={newNote.note_title} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Note</Form.Label>
              <Form.Control id="notecreate-form-body" as="textarea" name="note_body" value={newNote.note_body} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="form-note-actions">
                <Button id="form-note-submit" variant="success" onClick={createNote}>Submit</Button>
            </Form.Group>
          </Form>
        </Row>
      </Col>
    </Container>
  )
}


export default Notecreate;