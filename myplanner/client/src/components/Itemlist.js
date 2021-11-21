import React, { useState } from 'react';
import ItemModal from './ItemModal';
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

  const markCompleteHandler = function(e,item_id) {
    itemsApi.markComplete(item_id,e.target.checked) 
    updateStateCallback();
  }

  const itemModalHandler = function(item,type){
    var itemToView = {...item};
    setActiveItem(itemToView);
    setModalType(type);
    setShowItemModal(true);
  }

  const deleteItemHandler = async function (item) { 
    if (window.confirm(`Are you sure you want to delete this ${item.item_type.toLowerCase()}?`)) {
      await itemsApi.deleteItem(item.item_id);
      updateStateCallback();
    }
  }

  const trimItemBody = function(body) {
    return (body.length > 16) 
      ? body.substring(0,13) + "..."
      : body;
  }

  const ItemCheckbox = function(item) {
    if (item.item_type === "TASK") {
      return <Form.Check type="checkbox" onChange={(e) => markCompleteHandler(e,item)} checked={item.is_complete === "TRUE"}/>
    } else {
      return <Form.Check type="checkbox" onChange={(e) => markCompleteHandler(e,item)} checked={false} disabled={true}/>      
    }
  }

  const ItemOption = function(item) {
    return (
      <Dropdown align="start">
        <Dropdown.Toggle as="a">
          <List className="itemlist-item-expand mx-4"></List>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={()=> itemModalHandler(item,'view')}>View</Dropdown.Item>
          <Dropdown.Item onClick={()=> itemModalHandler(item,'edit')}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={()=> deleteItemHandler(item)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <Container id="itemlist" className="vh-100">
      <Col md={12}>
        <Row id="itemlist-header" md={3}>
            <h2>Items</h2>
        </Row>
        <Row id="itemlist-content" md={9}>
            {items.map(function(item){
              return (
                <div key={item.item_id} className="itemlist-item">
                  <Row md={12}>
                    <Col md={6} className="itemlist-item-main">
                      <div className="itemlist-item-mark-complete">
                        {ItemCheckbox(item)}
                      </div>
                      <span className="itemlist-item-title">{item.title}</span>
                    </Col>
                    <Col md={4} className="itemlist-item-desc">
                      <span className="itemlist-item-body">{trimItemBody(item.body)}</span>
                    </Col>
                    <Col md={1} className="itemlist-item-time">
                      <span className="itemlist-item-datecreated">{item.date_created}</span>
                    </Col>
                    <Col md={1} className="itemlist-item-actions">
                      {ItemOption(item)}
                    </Col>
                  </Row>
                </div>
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