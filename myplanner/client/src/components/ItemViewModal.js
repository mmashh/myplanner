import React from 'react';
import {
  Modal
} from 'react-bootstrap'


function ItemViewModal({activeItem, show, toggle}){

  const headerSuffix = (activeItem.item_type === "TASK"  && activeItem.is_complete === "TRUE") 
    ? "-  Completed"
    : "";

  return (
    <Modal
      className="item-modal"
      show={show}
      onHide={() => toggle(false)}
      backdrop="static"
      size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{activeItem.title} {headerSuffix}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p id="item-modal-content">
          {activeItem.body}
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default ItemViewModal;