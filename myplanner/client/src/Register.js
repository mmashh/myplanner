import React, { useState } from 'react';
import usersApi from './utils/usersApi';
import ErrorDisplay from './components/ErrorDisplay';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup
} from 'react-bootstrap';
import {
  useNavigate
} from 'react-router-dom';

function Register() {
  let navigate = useNavigate();
  let [validated, setValidated] = useState(false);
  let [error,setError] = useState();
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
  
  const registerUser = async function(e){
    const form = e.target;
    e.preventDefault();
    if (form.checkValidity()){
      let result = await usersApi.register(user);
      if (result.error){
        setError(result.error);
        setValidated(false);
        return;
      } else {
        navigate('/login');
      }
    }
    setValidated(true);
  }

  return (
    <Container fluid>
      <Row md={12}>
        <Col md={4} id="register-container" className="mx-auto my-5 p-5">
          <h1 className="mb-4">Register</h1>
          <hr/>
          <ErrorDisplay error={error}/>
          <Form onSubmit={registerUser} validated={validated} noValidate>
            <Form.Group className="mb-4">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                id="username" 
                name="username" 
                type="text" 
                placeholder="Username"
                value={user.username}
                onChange={handleFormChange} 
                required/>
              <Form.Control.Feedback type="invalid">The username field cannot be empty.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Password"
                value={user.password}
                onChange={handleFormChange}
                required/>
              <Form.Control.Feedback type="invalid">The password field cannot be empty.</Form.Control.Feedback>                
            </Form.Group>
            <Form.Group className="d-grid gap-3 mb-4">
              <Button variant="primary" type="submit">Register</Button>
              <Button variant="secondary" onClick={()=>navigate('/login')}>Back to Login</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}




export default Register;