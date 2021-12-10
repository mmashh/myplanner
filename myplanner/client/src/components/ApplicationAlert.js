import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Alert,
} from 'react-bootstrap';

function ApplicationAlert({type,message,show,handleClose}){
  

  // Reference: https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
  useEffect(function(){
    const alertTimeout = setTimeout(handleClose,3000);
    return ()=> {
      clearTimeout(alertTimeout);
    }
  },[handleClose])

  const AppAlert = function(){
    return (
      <Row md={12} className="fixed-bottom my-5">
        <Col md={{span:4,offset:4}}>
          <Alert variant={type} show={show} onClose={handleClose} dismissible>
            {message}
          </Alert>
        </Col>
      </Row>
    )
  }
  return <AppAlert/>
}


export default ApplicationAlert