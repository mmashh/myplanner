import React, { useState } from 'react';
import ItemModal from './ItemModal';
import ItemEntry from './ItemEntry';
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown
} from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import itemsApi from '../utils/itemsApi';

function Itemlist({items, updateStateCallback}) {
  let [activeItem, setActiveItem] = useState({
    title: "",
    body: "",
    item_type: "",
  });
  let [showItemModal, setShowItemModal] = useState(false);
  let [modalType, setModalType] = useState('view');

  const markCompleteHandler = async function(e,item_id) {
    await itemsApi.markComplete(item_id,e.target.checked);
    updateStateCallback();
  }

  const itemModalHandler = function(item,type){
    var itemToView = {...item};
    setActiveItem(itemToView);
    setModalType(type);
    setShowItemModal(true);
  }

  const handleDeleteItem = async function (item) { 
    if (window.confirm(`Are you sure you want to delete this ${item.item_type.toLowerCase()}?`)) {
      await itemsApi.deleteItem(item.item_id);
      updateStateCallback();
    }
  }


  return (
    <Container id="itemlist" className="vh-100" fluid>
      <Col md={12}>
        <Row id="itemlist-header" md={3}>
            <h2>Items</h2>
        </Row>
        <Row id="itemlist-content" md={9}>
            {items.map(function(item){
              return (
                <ItemEntry 
                  item={item} 
                  itemModalHandler={itemModalHandler} 
                  handleDeleteItem={handleDeleteItem} 
                  markCompleteHandler={markCompleteHandler}/>
            )})}
            <ItemModal 
              activeItem={activeItem}
              show={showItemModal}
              modalType={modalType}
              toggle={setShowItemModal}
              updateStateCallback={updateStateCallback}/>
        </Row>
      </Col>
    </Container>
  )
}

export default Itemlist;