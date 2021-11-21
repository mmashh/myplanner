import React from 'react';
import {
  Modal
} from 'react-bootstrap'


function ItemEditModal({activeItem, show, toggle, updateStateCallback}){

  return (
    <Modal
      className="item-modal"
      show={show}
      onHide={() => toggle(false)}
      backdrop="static"
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit {activeItem.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>
    </Modal>
  );
}

export default ItemEditModal;