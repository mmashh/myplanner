import React from 'react';
import {
  Row,
  Col,
  Dropdown,
  Form
} from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';


function ItemEntry({item, itemModalHandler,handleDeleteItem, markCompleteHandler}) {


  const ItemOption = function(item) {
    return (
      <Dropdown align="start">
        <Dropdown.Toggle as="a">
          <List className="itemlist-item-expand mx-4"></List>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={()=> itemModalHandler(item,'view')}>View</Dropdown.Item>
          <Dropdown.Item onClick={()=> itemModalHandler(item,'edit')}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={()=> handleDeleteItem(item)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
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

  return (
    <div key={item.item_id} className="itemlist-item">
    <Row md={12}>
      <Col xs={6} className="itemlist-item-main">
        <div className="itemlist-item-mark-complete">
          {ItemCheckbox(item)}
        </div>
        <span className="itemlist-item-title">{item.title}</span>
      </Col>
      <Col xs={4} className="itemlist-item-desc">
        <span className="itemlist-item-body">{trimItemBody(item.body)}</span>
      </Col>
      <Col xs={1} className="itemlist-item-time">
        <span className="itemlist-item-datecreated">{item.date_created}</span>
      </Col>
      <Col xs={1} className="itemlist-item-actions">
        {ItemOption(item)}
      </Col>
    </Row>
  </div>
  );
}

export default ItemEntry; 