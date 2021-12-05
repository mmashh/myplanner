import React, {
  useEffect,
  useState
} from 'react';
import Itemlist from './Itemlist'; 
import Itemcreate from './Itemcreate';
import LoadingScreen from './LoadingScreen';
import {
  Row,
  Col,
} from 'react-bootstrap';
import itemsApi from '../utils/itemsApi';

function Items() {
  let [items, setItems] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  // Reference: https://stackoverflow.com/a/54621059
  const updateItems = async function(){
    setIsLoading(true);
    var items = await itemsApi.getAllItems();
    if (Array.isArray(items)){
      setItems([...items]);
    }
    setIsLoading(false);
  }

  useEffect(() => updateItems(),[]);

  return (
      <>
        <Row md={12}>
          <Col md={4}>
            <Itemcreate updateStateCallback={updateItems}/>
          </Col>
          <Col md={8}>
            <Itemlist items={items} updateStateCallback={updateItems} />
          </Col>
        </Row>
        <LoadingScreen show={isLoading} isTransparent={true}/>
      </>
  );
}

export default Items;