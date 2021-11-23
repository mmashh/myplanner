import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import itemsApi from '../utils/itemsApi';

function  Itemcreate({updateStateCallback}){
  let [newItem, setNewItem] = useState({
    title: "",
    body: "",
    item_type: 'TASK'
  });

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

  async function createItem(e){
    e.preventDefault()
    await itemsApi.newItem(newItem);
    updateStateCallback(); // update parent state
    clearNewItem();
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
    <Container id="itemcreate" className="vh-100">
      <Col md={12}>
        <Row md={2} id="itemcreate-header">
          <h2>Create Item</h2>
        </Row>
        <Row md={10}>
          <Form onSubmit={createItem}>
            <Row md className="mb-3">
              <Col md={8}>
                <Form.Group controlId="item-title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" type="text" placeholder="Enter item title..."  value={newItem.title} onChange={handleFormChange}/>
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
                <Form.Control name="body" as="textarea" value={newItem.body} onChange={handleFormChange}/>
              </Form.Group>
            </Row>
            <Form.Group id="item-actions">
                <Button id="item-clear" className="mx-4" variant="danger" onClick={clearHandler}>Clear</Button>
                <Button id="item-submit" variant="success" type="submit" type="submit">Submit</Button>
            </Form.Group>
          </Form>
        </Row>
      </Col>
    </Container>
  )
}

export default Itemcreate;