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
import logoutUser from '../utils/logoutUser';
import {useNavigate} from 'react-router-dom';
function Items() {
  let [items, setItems] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [appAlertInfo, setAppAlertInfo] = useState({
    show:false,
    type:'info',
    message:''
  });
  let navigate = useNavigate();
  
  const handleError = async function(error) {
    if (error.error_type === 'EXPIREDTOKEN') {
      await logoutUser();
      navigate('/')
    } else {
      populateAlert('danger',`Error: ${error.error}`);
    }
  }

  // Reference: https://stackoverflow.com/a/54621059
  const updateItems = async function(){
    setIsLoading(true);
    var response = await itemsApi.getAllItems();
    if (Array.isArray(response)){
      setItems([...response]);
    } else {
      handleError(response); 
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

  const handleCreateItem = async function(item){
    await itemsApi.newItem(item);
    await updateItems(); // update parent state
    populateAlert('success',`"${item.title}" has been successfully created`);
  }

  
  useEffect(() => updateItems(),[]);

  return (
      <>
        <Container fluid>
          <Row md={12}>
            <Col md={4}>
              <Itemcreate handleCreateItem={handleCreateItem}/>
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