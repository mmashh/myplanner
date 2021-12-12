import React, { useEffect, useState } from 'react';
import usersApi from '../utils/usersApi';
import ErrorDisplay from './ErrorDisplay';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import {
  useNavigate,
  useLocation
} from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import ApplicationAlert from './ApplicationAlert';

function Login() {

  let navigate = useNavigate();
  let routerState = useLocation().state;
  let [error,setError] = useState();
  let [user,setUser] = useState({
    username: '',
    password: ''
  });
  let [validated,setValidated] = useState(false);
  let [loading, setLoading] = useState(false);

  let [appAlertInfo, setAppAlertInfo] = useState({
    show: false,
    message: '',
    type: 'default'
  });
  
  useEffect(function(){
    if (routerState?.applicationMessage) {
      setAppAlertInfo({
        show:true,
        message: routerState.applicationMessage.message,
        type: routerState.applicationMessage.type
      });
    }

    return ()=> {
      setAppAlertInfo({});
    }
  },[routerState]);

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
    const form = e.target;
    if (form.checkValidity()) {
      setLoading(true);
      var result = await usersApi.login(user);
      setLoading(false);
      if (result.error) {
        setError("The following user is invalid. Please verify your credentials and try a gain.");
        setValidated(false);
        return;
      } else {
        navigate('/calendar',{
          state: {
            applicationMessage: {
              type: 'info',
              message: 'The user has been successfully logged in.'
            }
          }
        });
      }
    } 
    setValidated(true);
  }

  return (
    <>
      <Container fluid>
        <Row md={12}>
          <Col md={4} className="mx-auto my-5">
            <Row id="login-header">
              <h1 className="mb-4">Log In </h1>
              <hr/>
            </Row>
            <ErrorDisplay error={error}/>
            <Form onSubmit={loginUser} validated={validated} noValidate>
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
                <Button variant="primary" type="submit">Log In</Button>
                <Button variant="secondary" onClick={()=>navigate('/register')}>Register</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <ApplicationAlert 
        type={appAlertInfo.type} 
        message={appAlertInfo.message} 
        show={appAlertInfo.show}
        handleClose={(prevState)=>{setAppAlertInfo({...prevState, show:false})}}/>
      <LoadingScreen show={loading} isTransparent={false} />
    </>
  );
}




export default Login;