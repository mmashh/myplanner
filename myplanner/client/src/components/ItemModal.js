import React, {useState, useEffect} from 'react';
import itemsApi from '../utils/itemsApi';
import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup
} from 'react-bootstrap'


function ItemModal({activeItem,modalType,show,toggle, updateStateCallback}){
  
  let [itemToEdit, setItemToEdit] = useState();

  useEffect(function(){
    var tempItem = {...activeItem};
    if (tempItem && tempItem !== {}) {
      setItemToEdit(activeItem);
    }
  },[activeItem])

  function handleFormChange(e){
    const {name,value} = e.target;
    setItemToEdit(function(prevState){
      return {
        ...prevState,
        [name]: value
      }
    });
  }

  const handleEditForm = async function(e) {
    e.preventDefault();
    await itemsApi.editItem(itemToEdit.item_id,itemToEdit);
    updateStateCallback()
    toggle(false);
  }

  const handleCancel = function(e) {
    if (window.confirm("Are you sure you want to cancel the edit? This cannot be undone.")){
      toggle(false);
    }
  }

  const headerSuffix = (activeItem.item_type === "TASK"  && activeItem.is_complete === "TRUE") 
    ? "-  Completed"
    : "";

  const ModalBodyView = function(){
    return (
      <p id="item-modal-content">
        {activeItem.body}
      </p>  
    );
  }
  
  const ModalBodyEdit = function(){
    return (
      <Form onSubmit={handleEditForm}>
        <Row>
          <Col md={9}>
            <Form.Group  className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control id="modal-item-title" name="title" type="text" value={itemToEdit.title} onChange={handleFormChange}/>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="modal-item-type" className="mb-3">
              <Form.Label>Item Type</Form.Label>
              <Form.Select  name="item_type" type="text" value={itemToEdit.item_type} onChange={handleFormChange}>
                <option value="TASK">Task</option>
                <option value="NOTE">Note</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row md={12}>
          <Form.Group controlId="modal-item-body" className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control name="body" type="text" as="textarea" value={itemToEdit.body} onChange={handleFormChange}/>
          </Form.Group>
        </Row>
        <Row>
          <ButtonGroup>
            <Button variant="danger" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" type="submit">Confirm</Button>
          </ButtonGroup>
        </Row>
      </Form>
    );
  }

  return (
    <Modal
      className="item-modal"
      show={show}
      onHide={() => toggle(false)}
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{(modalType === 'edit') ? `Edit ${activeItem.title}` : `${activeItem.title} ${headerSuffix}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(modalType === 'edit') ? ModalBodyEdit() : ModalBodyView()}
      </Modal.Body>
    </Modal>
  );
}

export default ItemModal;