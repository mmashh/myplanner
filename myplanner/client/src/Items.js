import React, {
  useEffect,
  useState
} from 'react';
import Itemlist from './components/Itemlist'; 
import Itemcreate from './components/Itemcreate';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import itemsApi from './utils/itemsApi';

function Items() {
  let [items, setItems] = useState([]);

  useEffect(function(){
    setItems(itemsApi.getAllItems());
  },[])  

  // Ref: https://stackoverflow.com/a/54621059
  function updateItemsState(){
    var items = itemsApi.getAllItems();
    setItems([...items]);
  }

  return (
    <Container fluid>
      <Row md={12}>
        <Col md={4}>
          <Itemcreate updateStateCallback={updateItemsState}/>
        </Col>
        <Col md={8}>
          <Itemlist items={items} updateStateCallback={updateItemsState}/>
        </Col>
      </Row>
    </Container>
  )
}

export default Items;