import React, { useState, useEffect, useLayoutEffect } from "react";
import { Calendar } from "./calendar";
import UpcomingEvents from "./upcomingEvents";
import { CreateEvent } from "./createEvent";
import { EventLists } from "./eventLists";
import eventApi from "../../utils/eventsApi";
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'
import UpcomingEventsToast from "./upcomingEventsToast";
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

  const handleChange = ({ target: { value, name } }) => {
    let oldValues = { ...eventInfo };
    oldValues[name] = value;
    setEventInfo(oldValues);
  };

  const handleCreateEvent = async (props) => {
    const { status, data } = await eventApi.newEvent(props);
    if (status === 201) {
      alert(data.message);
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

  const getUpcomingEvents = async (numWeeks) => {
    if (isNaN(numWeeks)){
      alert("You must select a valid option for the \"Upcoming Events\" dropdown.");
    } else {
      const response = await eventApi.getUpcomingEvents(numWeeks);
      setUpcomingEvents((prevState)=> {
        return {
          ...prevState,
          events: response
        }
      });
    }
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
    await eventApi.eventEdit(info);
    alert('Event has updated')
    setEventInfo(initial);
    setOpenForm(false)
    getAssignedEvents();
  };

  const handleDelete = async(props)=>{
    eventApi.eventDelete(props);
    alert('Event has deleted')
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
      <Container className="mt-2" fluid>
        <Row>
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
          <Col md={4} className={openForm ? "" : "d-none"}>
            <CreateEvent {...eventCreateContext} />
          </Col>
        </Row>
        <Row>
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
    </>
  );
};

export default EventCalendar;
