import React from 'react';
import {
  Container,
  Row,
  Col,
  Stack
} from 'react-bootstrap';


function Notelist(props) {

  console.log(props.notes)
  return (
    <Container>
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
                          <a href="javascript:alert('marked as complete')">mark</a>
                        </div>
                        <div>{item.note_title}</div>
                      </Col>
                      <Col xs={4} className="notelist-item-desc">
                        <div>{item.note_body}</div>
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