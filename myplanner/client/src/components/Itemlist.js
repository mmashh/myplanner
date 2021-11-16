import React, { useEffect,useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form
} from 'react-bootstrap';
import itemsApi from '../utils/itemsApi';

function Itemlist(props) {

  function markCompleteHandler(e,item_id) {
    itemsApi.markComplete(item_id,e.target.checked) 
    props.updateStateCallback();
  }

  function itemCheckbox(item) {
    if (item.item_type === "TASK") {
      return <Form.Check type="checkbox" onChange={(e) => markCompleteHandler(e,item.item_id)} checked={item.is_complete === "TRUE"}/>
    } else {
      return <Form.Check type="checkbox" onChange={(e) => markCompleteHandler(e,item.item_id)} checked={false} disabled={true}/>      
    }
  }

  return (
    <Container id="itemlist">
      <Col sm={12}>
        <Row id="itemlist-header" md={3}>
            <h2>Items</h2>
        </Row>
        <Row id="itemlist-content" md={9}>
            {props.items.map(function(item){
              return (
                <div key={item.item_id} className="itemlist-item">
                  <Row md={12}>
                    <Col md={6} className="itemlist-item-main">
                      <div className="itemlist-item-mark-complete">
                        {itemCheckbox(item)}
                      </div>
                      <span className="itemlist-item-title">{item.title}</span>
                    </Col>
                    <Col md={4} className="itemlist-item-desc">
                      <span className="itemlist-item-body">{item.body}</span>
                    </Col>
                    <Col md={1} className="itemlist-item-time">
                      <span className="itemlist-item-datecreated">{item.date_created}</span>
                    </Col>
                    <Col md={1} className="itemlist-item-actions">
                      Options
                    </Col>
                  </Row>
                </div>
            )})}
        </Row>
      </Col>
    </Container>
  )
}

export default Itemlist;