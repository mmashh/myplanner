import React from 'react';
import {
  Row,
  Col,
  Alert
} from 'react-bootstrap'

function ApplicationAlert({type,message,show,handleClose}){

  const AppAlert = function(){
    return (
      <Row md={12}>
        <Col md={{span:4,offset:4}}>
          <Alert variant={type} onClose={handleClose} dismissible>
            {message}
          </Alert>
        </Col>
      </Row>
    )
  }

  return ((show)? <AppAlert/>: null);
}


export default ApplicationAlert