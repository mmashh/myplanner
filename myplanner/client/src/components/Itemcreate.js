import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';

function  Itemcreate({handleCreateItem}){
  let [newItem, setNewItem] = useState({
    title: "",
    body: "",
    item_type: 'TASK'
  });
  let [validated, setValidated] = useState(false);
  //Ref: https://stackoverflow.com/a/61243124
  function handleFormChange(e){
    const {name,value} = e.target
    setNewItem(function(prevState){
      return {
        ...prevState,
        [name]: value
      }
    });
  }

  async function handleSubmit(e){
    e.preventDefault()
    const form = e.target;
    setValidated(true);
    if (form.checkValidity()){
      await handleCreateItem(newItem);
      clearNewItem();
      setValidated(false);
    }
  }

  function clearNewItem(){
      setNewItem({
        title:  "",
        body: "",
        item_type: "TASK",
      });
  }

  function clearHandler(){
    if (window.confirm(`Are you sure you want to clear your current ${newItem.item_type.toLowerCase()}?`)){
      clearNewItem();
    }
  }

  return (
    <Container id="itemcreate" className="vh-100" fluid>
      <Col md={12}>
        <Row md={2} id="itemcreate-header">
          <h2>Create Item</h2>
        </Row>
        <Row md={10}>
          <Form onSubmit={handleSubmit} validated={validated} noValidate>
            <Row md className="mb-4">
              <Col md={8}>
                <Form.Group controlId="item-title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" type="text" placeholder="Enter item title..."  value={newItem.title} onChange={handleFormChange} maxLength={99} required/>
                  <Form.Control.Feedback type="invalid">An item title must be provided</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="item-item-type">
                  <Form.Label>Item Type</Form.Label>
                  <Form.Select name="item_type" type="text" value={newItem.item_type} onChange={handleFormChange}>
                    <option value="TASK">Task</option>
                    <option value="NOTE">Note</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row md>
              <Form.Group controlId="item-body" className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control name="body" as="textarea" value={newItem.body} onChange={handleFormChange} maxLength={512}/>
              </Form.Group>
            </Row>
            <Form.Group id="item-actions">
                <Button id="item-clear" className="mx-4" variant="danger" onClick={clearHandler}>Clear</Button>
                <Button id="item-submit" variant="success" type="submit">Submit</Button>
            </Form.Group>
          </Form>
        </Row>
      </Col>
    </Container>
  )
}

export default Itemcreate;