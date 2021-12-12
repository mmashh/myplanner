import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { Calendar } from "./calendar";
import UpcomingEvents from "./upcomingEvents";
import UpcomingEventsToast from "./upcomingEventsToast";
import { CreateEvent } from "./createEvent";
import { EventLists } from "./eventLists";
import ApplicationAlert from "../ApplicationAlert";
import LoadingScreen from "../LoadingScreen";
import eventApi from "../../utils/eventsApi";
import logoutUser from "../../utils/logoutUser";
import { useNavigate, useLocation } from "react-router-dom";

const EventCalendar = () => {
  let initial = {
    event_id: "",
    title: "",
    body: "",
    color: "#fc037b",   // stretch goal
    datetime: "",
  };
  const [openForm, setOpenForm] = useState(false);
  const [eventInfo, setEventInfo] = useState(initial);
  const [unassignedLists, setUnassignedLists] = useState([]);
  const [assignedLists, setAssignedLists] = useState([]);
  const [dragEvent, setDragEvent] = useState({});
  const [upcomingEvents,setUpcomingEvents] = useState({
    numWeeks: 1,
    events: []
  });
  const [showToast,setShowToast] = useState(false);
  const [loading,setLoading] = useState(true);
  const routerState = useLocation().state;
  const navigate = useNavigate();
  const [appAlertInfo, setAppAlertInfo] = useState({
    show: false,
    message: '',
    type: 'default'
  });
  
  useEffect(function(){
    if (routerState?.applicationMessage) {
      setAppAlertInfo({
        show:true,
        message: routerState.applicationMessage.message,
        type: routerState.applicationMessage.type
      });
    }

    return ()=> {
      setAppAlertInfo({});
    }
  },[routerState]);

  const handleError = async function(error) {
    if (error.error_type === 'UNAUTHORIZED') {
      navigate('/login', {
        state: {
          applicationMessage: {
            type: 'danger',
            message: 'You have been logged out for security purposes. Please log in again to continue using the application.'
          }
        }
      });
      // await logoutUser();
    } else {
      populateAlert('danger',`Error: ${error.error}`);
    }
  }

  const populateAlert = function (type,message) {
    setAppAlertInfo({
    show:true,
    type:type,
    message: message
    });
  }

  const handleChange = ({ target: { value, name } }) => {
    let oldValues = { ...eventInfo };
    oldValues[name] = value;
    setEventInfo(oldValues);
  };

  const handleCreateEvent = async (props) => {
    setLoading(true);
    const response = await eventApi.newEvent(props);
    if (response.error === undefined) {
      setEventInfo(initial);
      getUnassignedEvents();
      populateAlert('success','The event has been successfully created');
    } else {
      handleError(response);
    }
    setLoading(false);
  };

  const getUnassignedEvents = async () => {
    setLoading(true);
    let response = await eventApi.eventUnassignedList();
    if (response.error === undefined) {
      setUnassignedLists(Array.isArray(response) ? response : []);
    } else {
      handleError(response);
      setUnassignedLists([]);
    }
    setLoading(false);

  };

  const getAssignedEvents = async () => {
    setLoading(true);
    let response = await eventApi.eventAssignedList();
    if (response.error === undefined) {
      setAssignedLists(Array.isArray(response) ? response : []);
    } else {{
      handleError(response);
      setUnassignedLists([]);
    }}
    setLoading(false);
  };

  const getUpcomingEvents = async (numWeeks) => {
    setLoading(true);
    if (isNaN(numWeeks)){
      alert("You must select a valid option for the \"Upcoming Events\" dropdown.");
    } else {
      let response = await eventApi.getUpcomingEvents(numWeeks);
      if (response.error === undefined) {
        setUpcomingEvents((prevState)=> {
          return {
            ...prevState,
            events: response
          }
        });
      } else {
        handleError(response);
      }
    }
    setLoading(false);
  }

  const setNumWeeks = (n)=> {
    setUpcomingEvents((prevState) => {
      return {
        ...prevState,
        numWeeks: n
      }
    });
  }

  useLayoutEffect(() => {
    const initializeEvents = async ()=>{
      await getUnassignedEvents();
      await getAssignedEvents();
      await getUpcomingEvents(1);
      setShowToast(true);
    }
    initializeEvents();
  }, []);

  useEffect(()=>{
    const upcomingEventsForWeek = async (numWeeks)=>{
      await getUpcomingEvents(numWeeks);
    };
    upcomingEventsForWeek(upcomingEvents.numWeeks);
  },[upcomingEvents.numWeeks]);

  const onDragStart = (props) => {
    setDragEvent({ ...props });
  };

  const handleUpdate = async (props) => {
    let info = { ...props };
    let date = info.datetime.split("-");
    let finalDate = `${date[2]}/${date[1]}/${date[0]} 0:0`;

    info['datetime'] = finalDate;
    setLoading(true);
    const response = await eventApi.eventEdit(info);
    if (response.error === undefined) {
      getAssignedEvents();
      populateAlert('success','The event has been successfully updated');    
      setEventInfo(initial);
      setOpenForm(false)
    } else {
      handleError(response);
    }
    setLoading(false);
  };

  const handleDelete = async(props)=>{
    setLoading(true);
    const response = await eventApi.eventDelete(props);
    if (response.error === undefined) {
      getAssignedEvents();
      populateAlert('success','The event has been successfully deleted');
      setEventInfo(initial);
      setOpenForm(false)  
    } else {
      handleError(response);
    }
    setLoading(false);
  }

  const eventCreateContext = {
    eventInfo,
    addEvent: handleCreateEvent,
    changeEvent: handleChange,
    updateEvent: handleUpdate,
    deleteEvent:handleDelete,
    closeCard: ()=>{setOpenForm(false)}
  };
  return (
    <>
      <Container id="event-calendar" className="mt-2" fluid>
        <Row md={12}>
          <Col md={8} className="mb-2">
            <Calendar
              setEventInfo={setEventInfo}
              setForm={setOpenForm}
              events={assignedLists}
              dragEvent={dragEvent}
              updateCalendar={getAssignedEvents}
              updateUnassignedList={getUnassignedEvents}
              initialEvent={initial}
            />
          </Col>
          <Col md={4} className={openForm ? "mb-4" : "d-none"}>
            <CreateEvent {...eventCreateContext} />
          </Col>
        </Row>          
        <Row md={12}>
          <Col md={8} className="mt-4">
            <EventLists
              unassignedLists={unassignedLists}
              handleDrag={onDragStart}
            />
          </Col>
          <Col md={4} className="mt-4">
            <UpcomingEvents 
              upcomingEvents={upcomingEvents.events} 
              setNumWeeks={setNumWeeks}
            />
          </Col>
        </Row>
      </Container>
      <UpcomingEventsToast upcomingEvents={upcomingEvents.events} show={showToast} handleClose={()=>{setShowToast(false)}}/>
      <ApplicationAlert 
          show={appAlertInfo.show}
          type={appAlertInfo.type}
          message={appAlertInfo.message}
          handleClose={(prevState)=>{setAppAlertInfo({...prevState, show:false})}}/>
      <LoadingScreen show={loading}/>
    </>
  );
};

export default EventCalendar;
