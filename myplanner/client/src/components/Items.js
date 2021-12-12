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
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [appAlertInfo, setAppAlertInfo] = useState({
    show:false,
    type:'info',
    message:''
  });
  const navigate = useNavigate();
  
  useEffect(() => updateItems(),[]);

  const handleError = async function(error) {
    if (error.error_type === 'UNAUTHORIZED') {
      await logoutUser();
      console.log("hello");
      navigate('/', {
        state: {
          applicationMessage: {
            type: 'danger',
            message: 'You have been logged out for security purposes. Please log in again to continue using the application.'
          }
        }
      });
    } else {
      populateAlert('danger',`Error: ${error.error}`);
    }
  }

  const populateAlert = function(type,message) {
    setAppAlertInfo({
    show:true,
    type:type,
    message: message
    });
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

  const handleCreateItem = async function(item){
    setIsLoading(true);
    var response = await itemsApi.newItem(item);
    if (response.error === undefined) {
      populateAlert('success',`"${item.title}" has been successfully created`);
      await updateItems();
    } else {
      handleError(response);
    }
    setIsLoading(false);
  }

  const handleMarkSuccess = async function(item,isChecked) {
    setIsLoading(true);
    var response = await itemsApi.markComplete(item,isChecked);
    if (response.error === undefined) {
      await updateItems();
      populateAlert("success",`The item "${item.title}" has been marked as ${isChecked ? "complete" : "incomplete"}.`);
    } else {
      handleError(response);
    }
    setIsLoading(false);
  }
  
  const handleEdit = async function(item){
    setIsLoading(true);
    var response = await itemsApi.editItem(item.item_id,item);
    if (response.error === undefined) {
      await updateItems();
      populateAlert("success", `"${item.title}" has been successfully modified.`)
    } else {
      handleError(response);
    }
    setIsLoading(false);
  }

  const handleDelete = async function(item){
    setIsLoading(true);
    var response = await itemsApi.deleteItem(item.item_id);
    if (response.error === undefined) {
      await updateItems();
      populateAlert("success", `Successfully deleted "${item.title}".`)
    } else {
      handleError(response);
    }
    setIsLoading(false);
  }


  return (
      <>
        <Container fluid>
          <Row md={12}>
            <Col md={4}>
              <Itemcreate handleCreateItem={handleCreateItem}/>
            </Col>
            <Col md={8}>
              <Itemlist 
                items={items} 
                handleMarkSuccess={handleMarkSuccess}
                handleEdit={handleEdit}
                handleDelete={handleDelete} />
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