import React, { useState } from 'react';
import usersApi from './utils/usersApi';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';

function Login(props) {

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
  
  const loginUser = function(){
    var accessKey = usersApi.login(user);
    props.loginCallback(accessKey);
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
              <Button variant="primary" onClick={loginUser}>Log In</Button>
              <Button variant="secondary">Register</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}




export default Login;