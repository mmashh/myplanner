import React, {
  useEffect,
  useState
} from 'react';
import Itemlist from './Itemlist'; 
import Itemcreate from './Itemcreate';
import LoadingScreen from './LoadingScreen';
import ApplicationAlert from './ApplicationAlert';
import {
  Row,
  Col,
  Container
} from 'react-bootstrap';
import itemsApi from '../utils/itemsApi';

function Items() {
  let [items, setItems] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [appAlertInfo, setAppAlertInfo] = useState({
    show:false,
    type:'info',
    message:''
  });

  // Reference: https://stackoverflow.com/a/54621059
  const updateItems = async function(){
    setIsLoading(true);
    var items = await itemsApi.getAllItems();
    if (Array.isArray(items)){
      setItems([...items]);
    }
    setIsLoading(false);
  }

  const populateAlert = function(type,message) {
    setAppAlertInfo({
    show:true,
    type:type,
    message: message
    });
  }

  useEffect(() => updateItems(),[]);

  return (
      <>
        <Container fluid>
          <Row md={12}>
            <Col md={4}>
              <Itemcreate populateAlert={populateAlert} updateStateCallback={updateItems}/>
            </Col>
            <Col md={8}>
              <Itemlist items={items} populateAlert={populateAlert} updateStateCallback={updateItems} />
            </Col>
          </Row>
        </Container>
        <ApplicationAlert 
          show={appAlertInfo.show}
          type={appAlertInfo.type}
          message={appAlertInfo.message}
          handleClose={(prevState)=>{setAppAlertInfo({...prevState, show:false})}}/>
        <LoadingScreen show={isLoading} isTransparent={true}/>
      </>
  );
}

export default Items;