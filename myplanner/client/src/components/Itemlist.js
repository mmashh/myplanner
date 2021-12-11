import React, { useState } from "react";
import ItemModal from "./ItemModal";
import ItemEntry from "./ItemEntry";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Itemlist({items,handleMarkSuccess,handleEdit,handleDelete}) {
  let [activeItem, setActiveItem] = useState({
    title: "",
    body: "",
    item_type: "",
  });
  let [showItemModal, setShowItemModal] = useState(false);
  let [modalType, setModalType] = useState("view");

  const itemModalHandler = function(item,type){
    var itemToView = {...item};
    setActiveItem(itemToView);
    setModalType(type);
    setShowItemModal(true);
  }

  const markCompleteHandler = async function(e,item) {
    await handleMarkSuccess(item,e.target.checked);
  }

  const handleDeleteItem = async function (item) { 
    if (window.confirm(`Are you sure you want to delete this ${item.item_type.toLowerCase()}?`)) {
      await handleDelete(item);
    }
  }

  return (
    <Container id="itemlist" className="vh-100" fluid>
      <Col md={12}>
        <Row id="itemlist-header" md={3}>
            <h2>To-Do List Items</h2>
        </Row>
        {(items.length > 0) 
        ? items.map(function(item){
              return (
                <ItemEntry 
                  key={item.item_id}
                  item={item} 
                  itemModalHandler={itemModalHandler} 
                  handleDeleteItem={handleDeleteItem} 
                  markCompleteHandler={markCompleteHandler}/>
            )})
        : <p id="empty-item-list">No items are currently available for this user.</p>
        }
        <Row id="itemlist-content" md={9}>

        </Row>
        <ItemModal 
              activeItem={activeItem}
              show={showItemModal}
              modalType={modalType}
              toggle={setShowItemModal}
              handleEdit={handleEdit}/>
      </Col>
    </Container>
  )
}

export default Itemlist;