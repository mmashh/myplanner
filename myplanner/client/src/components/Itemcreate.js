import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import itemsApi from '../utils/itemsApi';

function  Itemcreate(props){
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
    console.log(newItem);
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

  function createItem(){
    itemsApi.newItem(newItem);
    props.updateStateCallback(); // update parent state
    clearNewItem();
  }

  return (
    <Container id="itemcreate">
      <Col md={12}>
        <Row md={2} id="itemcreate-header">
          <h2>Create Item</h2>
        </Row>
        <Row md={10}>
          <Form>
            <Form.Group className="mb-3">
              <Row md>
                <Col md={8}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control id="item-title" name="title" type="text" placeholder="Enter item title..."  value={newItem.title} onChange={handleFormChange}/>
                </Col>
                <Col md={4}>
                  <Form.Label>Item Type</Form.Label>
                  <Form.Select id="item-title" name="item_type" type="text" value={newItem.item_type} onChange={handleFormChange}>
                    <option value="TASK">Task</option>
                    <option value="NOTE">Note</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control id="item-body" name="body" as="textarea" value={newItem.body} onChange={handleFormChange}/>
            </Form.Group>
            <Form.Group controlId="form-item-actions">
                <Button id="form-item-submit" variant="success" onClick={createItem}>Submit</Button>
                <Button id="form-item-submit" className="mx-4" variant="danger" onClick={clearHandler}>Clear</Button>
            </Form.Group>
          </Form>
        </Row>
      </Col>
    </Container>
  )
}

export default Itemcreate;