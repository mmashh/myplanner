import React, { useState } from 'react';
import usersApi from './utils/usersApi';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import {
  useNavigate
} from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
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
  
  const loginUser = async function(e){
    e.preventDefault();
    await usersApi.login(user);
    navigate('/calendar');
  }

  return (
    <Container fluid>
      <Row md={12} className="vh-100">
        <Col md={4} className="mx-auto my-5">
          <Form onSubmit={loginUser}>
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
              <Button variant="primary" type="submit">Log In</Button>
              <Button variant="secondary" onClick={()=>navigate('/register')}>Register</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}




export default Login;