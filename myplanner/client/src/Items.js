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


  // Ref: https://stackoverflow.com/a/54621059
  const updateItems = async function(){
    var items = await itemsApi.getAllItems()
    setItems([...items]);
  }

  useEffect(() => updateItems(),[]);

  return (
      <Row md={12}>
        <Col md={4}>
          <Itemcreate updateStateCallback={updateItems}/>
        </Col>
        <Col md={8}>
          <Itemlist items={items} updateStateCallback={updateItems}/>
        </Col>
      </Row>
  )
}

export default Items;