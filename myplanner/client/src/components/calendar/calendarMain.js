import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { Calendar } from "./calendar";
import { useLocation } from "react-router-dom";
import { CreateEvent } from "./createEvent";
import { EventLists } from "./eventLists";
import eventApi from "../../utils/eventsApi";
import ApplicationAlert from "../ApplicationAlert";
import LoadingScreen from "../LoadingScreen";
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
  const [loading,setLoading] = useState(true);
  const routerState = useLocation().state;
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
    const { status, data } = await eventApi.newEvent(props);
    if (status == 201) {
      setEventInfo(initial);
      getUnassignedEvents();
      populateAlert('success','The event has been successfully created');
    }
    setLoading(false);
  };

  const getUnassignedEvents = async () => {
    const response = await eventApi.eventUnassignedList();
    setUnassignedLists(response);
  };

  const getAssignedEvents = async () => {
    const response = await eventApi.eventAssignedList();
    setAssignedLists(response);
  };

  useLayoutEffect(() => {
    async function getAllEvents() {
      setLoading(true);
      await getUnassignedEvents();
      await getAssignedEvents();
      setLoading(false);
    }
    
    getAllEvents();
  }, []);

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
    getAssignedEvents();
    setLoading(false);
    populateAlert('success','The event has been successfully updated');    
    setEventInfo(initial);
    setOpenForm(false)
  };

  const handleDelete = async(props)=>{
    setLoading(true);
    const response = await eventApi.eventDelete(props);
    setLoading(false);
    populateAlert('success','The event has been successfully deleted');
    setEventInfo(initial);
    setOpenForm(false)
    getAssignedEvents();
  }

  const eventCreateContext = {
    eventInfo,
    addEvent: handleCreateEvent,
    changeEvent: handleChange,
    updateEvent: handleUpdate,
    deleteEvent:handleDelete
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
            />
          </Col>
          <Col md={4} className={openForm ? "mb-4" : "d-none"}>
            <CreateEvent {...eventCreateContext} />
          </Col>
        </Row>          
        <Row md={12}>
          <Col md={8}>
            <EventLists
              unassignedLists={unassignedLists}
              handleDrag={onDragStart}
            />
          </Col>
          <Col md={4} className="upcoming-events">
            <div className="">Upcoming Events WIP</div>
          </Col>
        </Row>
      </Container>
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
