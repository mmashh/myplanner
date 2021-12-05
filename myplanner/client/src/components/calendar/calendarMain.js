import React, { useState, useEffect, useLayoutEffect } from "react";
import { Calendar } from "./calendar";
import { CreateEvent } from "./createEvent";
import { EventLists } from "./eventLists";
import eventApi from "../../utils/eventsApi";
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

  const handleChange = ({ target: { value, name } }) => {
    let oldValues = { ...eventInfo };
    oldValues[name] = value;
    setEventInfo(oldValues);
  };

  const handleCreateEvent = async (props) => {
    const { status, data } = await eventApi.newEvent(props);
    if (status == 201) {
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
    alert('Event has updated')
    setEventInfo(initial);
    setOpenForm(false)
    getAssignedEvents();
  };

  const handleDelete = async(props)=>{
    const response = await eventApi.eventDelete(props);
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
      <div className="container mt-2">
        <div className="row">
          <div className="col-xl-8 mb-2">
            <Calendar
              setEventInfo={setEventInfo}
              setForm={setOpenForm}
              events={assignedLists}
              dragEvent={dragEvent}
              updateCalendar={getAssignedEvents}
              updateUnassignedList={getUnassignedEvents}
            />
          </div>
          <div className={openForm ? "col-xl-4" : "d-none"}>
            <CreateEvent {...eventCreateContext} />
          </div>
          <div className="col-xl-12  mt-4">
            <EventLists
              unassignedLists={unassignedLists}
              handleDrag={onDragStart}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCalendar;
