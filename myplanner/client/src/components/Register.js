import React, { useState,useEffect } from 'react';
import usersApi from '../utils/usersApi';
import ErrorDisplay from './ErrorDisplay';
import LoadingScreen from './LoadingScreen';
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

function Register() {
  let navigate = useNavigate();
  let [validated, setValidated] = useState(false);
  let [error,setError] = useState();
  let [loading,setLoading] = useState();
  let [user,setUser] = useState({
    username: '',
    password: ''
  });

  useEffect(function(){
    return function(){
      // clean up useNavigate hook (https://stackoverflow.com/q/53949393)
    }
  },[]);

  
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
      setLoading(true);
      let result = await usersApi.register(user);
      setLoading(false);
      if (result.info !==  undefined){
        navigate('/login', {
          state: {
            applicationMessage: {
              type: 'info',
              message: 'The user has been successfully registered.'
            }
          }
        });
      } else {
        setError("This user already exists. Please try again.");
        setValidated(false);
        return;
        
      }
    }
    setValidated(true);
  }

  return (
    <>
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
                required
                maxLength={80}/>
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
                maxLength={80}
                required/>
              <Form.Control.Feedback type="invalid">The password field cannot be empty.</Form.Control.Feedback>                
            </Form.Group>
            <Form.Group className="d-grid gap-3 mb-4">
              <Button variant="primary" type="submit">Create User</Button>
              <Button variant="secondary" onClick={()=>navigate('/login')}>Back to Login</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
    <LoadingScreen show={loading} isTransparent={false} />
    </>

  );
}

export default Register;