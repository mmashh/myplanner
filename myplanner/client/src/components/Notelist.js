import React, { useEffect,useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form
} from 'react-bootstrap';
import notesApi from '../utils/notesApi';

function Notelist(props) {

  function markCompleteHandler(e,note_id) {
    notesApi.markComplete(note_id,e.target.checked) 
    props.callback();
  }

  return (
    <Container id="notelist">
      <Col sm={12}>
        <Row id="notelist-header" md={3}>
            <h2>Notes</h2>
        </Row>
        <Row id="notelist-content" md={9}>
            {props.notes.map(function(item){
              return (
                <div key={item.note_id} className="notelist-item">
                  <Row md={12}>
                    <Col md={6} className="notelist-item-main">
                      <div className="notelist-item-mark-complete">
                        <Form.Check type="checkbox" onChange={(e) => markCompleteHandler(e,item.note_id)}/>
                      </div>
                      <span className="notelist-item-title">{item.note_title}</span>
                    </Col>
                    <Col md={4} className="notelist-item-desc">
                      <span className="notelist-item-body">{item.note_body}</span>
                    </Col>
                    <Col md={1} className="notelist-item-time">
                      <span className="notelist-item-datecreated">{item.date_created}</span>
                    </Col>
                    <Col md={1} className="notelist-item-actions">
                      Options
                    </Col>
                  </Row>
                </div>
            )})}
        </Row>
      </Col>
    </Container>
  )
}

export default Notelist;