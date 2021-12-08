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
  let routerState = useLocation().state;
  let [appAlertInfo, setAppAlertInfo] = useState({
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

  const populateAlert = function(type,message) {
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
    const { status, data } = await eventApi.newEvent(props);
    if (status == 201) {
      populateAlert('success','The event has been successfully created');
      setEventInfo(initial);
      getUnassignedEvents();
    }
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
    getUnassignedEvents();
    getAssignedEvents();
  }, []);

  const onDragStart = (props) => {
    setDragEvent({ ...props });
  };

  const handleUpdate = async (props) => {
    let info = { ...props };
    let date = info.datetime.split("-");
    let finalDate = `${date[2]}/${date[1]}/${date[0]} 0:0`;

    info['datetime'] = finalDate;
    const response = await eventApi.eventEdit(info);
    populateAlert('success','The event has been successfully updated');    
    setEventInfo(initial);
    setOpenForm(false)
    getAssignedEvents();
  };

  const handleDelete = async(props)=>{
    const response = await eventApi.eventDelete(props);
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
    </>
  );
};

export default EventCalendar;
