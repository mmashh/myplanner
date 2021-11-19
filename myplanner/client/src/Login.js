import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import createUtilityClassName from 'react-bootstrap/esm/createUtilityClasses';

function Login() {

  let [user,setUser] = useState({
    username: '',
    password: ''
  });
  
  //Ref: https://stackoverflow.com/a/61243124
  const handleFormChange = function(e){
    const {name,value} = e.target
    setUser(function(prevState){
      return {
        ...prevState,
        [name]: value
      }
    });
  }
  

  return (
    <Container fluid>
      <Row md={12} className="vh-100">
        <Col md={4} className="mx-auto my-5">
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>Login</Form.Label>
              <Form.Control 
                id="username" 
                name="username" 
                type="text" 
                placeholder="Enter username here..."
                value={user.username}
                onChange={handleFormChange}/>
            </Form.Group>
            <Form.Group className="mb-5">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Password"
                value={user.password}
                onChange={handleFormChange}/>
            </Form.Group>
            <Form.Group className="d-grid gap-3 mb-4">
              <Button variant="primary">Log In</Button>
              <Button variant="secondary">Register</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}




export default Login;