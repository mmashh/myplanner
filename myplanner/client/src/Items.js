import React, {
  useEffect,
  useState
} from 'react';
import Itemlist from './components/Itemlist'; 
import Itemcreate from './components/Itemcreate';
import {
  Container,
  Row,
  Col,
  Modal
} from 'react-bootstrap';
import itemsApi from './utils/itemsApi';

function Items() {
  let [items, setItems] = useState([]);
  let [activeItem, setActiveItem] = useState({}) //Item to show in the modal
  let [showModal, setShowModal] = useState(false);
  // Ref: https://stackoverflow.com/a/54621059
  const updateItems = async function(){
    var items = await itemsApi.getAllItems()
    setItems([...items]);
  }

  const viewItemHandler = function(item){
    var itemToShow= {...item}
    setActiveItem(itemToShow);
    setShowModal(true);
  }

  const closeModal = function(){
    setShowModal(false);
  }

  useEffect(() => updateItems(),[]);

  const ItemModal = function(){
    const headerSuffix = (activeItem.item_type === "TASK"  && activeItem.is_complete === "TRUE") 
      ? "-  Completed"
      : "";

    return (
      <Modal
        id="item-modal"
        show={showModal}
        onHide={closeModal}
        backdrop="static"
        size="lg"
      >
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

  return (
      <Row md={12}>
        <Col md={4}>
          <Itemcreate updateStateCallback={updateItems}/>
        </Col>
        <Col md={8}>
          <Itemlist items={items} updateStateCallback={updateItems} viewItemHandler={viewItemHandler}/>
          {ItemModal()}
        </Col>
      </Row>
  );
}

export default Items;