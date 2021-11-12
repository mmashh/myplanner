import React from 'react';
import {
  Container,
  Row,
  Col,
  Stack,
  Form
} from 'react-bootstrap';


function Notelist(props) {

  return (
    <Container className="notelist">
      <Col sm={12}>
        <Row id="notelist-header" xs={3}>
            <h2>Notes</h2>
        </Row>
        <Row id="notelist-content" xs={9}>
            {props.notes.map(function(item,i){
              console.log(item)
              return (
                <>
                  <div className="notelist-item">
                    <Row xs={12}>
                      <Col xs={7} className="notelist-item-main">
                        
                        <div className="notelist-item-mark-complete">
                          <Form.Check type="checkbox" />
                        </div>
                        <span className="notelist-item-title">{item.note_title}</span>
                      </Col>
                      <Col xs={4} className="notelist-item-desc">
                        <span className="notelist-item-body">{item.note_body}</span>
                      </Col>
                      <Col xs={1} className="notelist-item-actions">
                        Options
                      </Col>
                    </Row>
                  </div>
                </>
            )
            })}
        </Row>
      </Col>
    </Container>
  )
}



export default Notelist;