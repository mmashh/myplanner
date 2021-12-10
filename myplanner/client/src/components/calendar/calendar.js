import React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import eventApi from "../../utils/eventsApi";
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
export const Calendar = ({
  setForm,
  dragEvent,
  updateUnassignedList,
  events,
  updateCalendar,
  setEventInfo
}) => {
  const CustomToolbar = (props) => {
    let {
      localizer: { messages }, //-- Change endpoint to order by chronological
      label,
    } = props;
    const navigate = (action) => {
      props.onNavigate(action);
    };
    const context = {
      PREVIOUS: "PREV",
      NEXT: "NEXT",
      TODAY: "TODAY",
      DATE: "DATE",
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={() => navigate(context.PREVIOUS)}>
            Prev
          </button>
          <button type="button" onClick={() => navigate(context.TODAY)}>
            Today
          </button>
        </span>
        <span className="rbc-toolbar-label" style={{ fontSize: "20px" }}>
          {label}
        </span>
        <span className="rbc-btn-group">
          <button type="button" onClick={() => navigate(context.NEXT)}>
            Next
          </button>
        </span>
        <span className="rbc-btn-group">
          <button onClick={() => setForm(true)}>
            <FontAwesomeIcon icon={faCalendarPlus} />
          </button>
        </span>
      </div>
    );
  };

  const handleDragDrop = async ({ start }) => {
    let date = new Date(start);
    let customDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    const eventInfo = {
      ...dragEvent,
      datetime: customDate,
    };
    await eventApi.eventEdit(eventInfo);

    updateUnassignedList();
    updateCalendar();
  };

  const customEvents = () => {
    if (Array.isArray(events) && events.length === 0) return [];
    let modifiedEvents = events.map((item) => {
      let date = item.datetime.split(" ");
      let dateForCalendar = date[0].split("/");
      let finalDate = `${dateForCalendar[2]}-${dateForCalendar[1]}-${dateForCalendar[0]}`;
      let eventInfo = {
        event_id: item.event_id,
        title: item.title,
        start: finalDate,
        end: finalDate,
        body: item.body ? item.body : '',
        color:item.color ? item.color : '#037ffc',
        datetime:finalDate
      };
      return eventInfo;
    });
    return modifiedEvents;
  };

  const handleEventStyle = (event) => {
    var backgroundColor = event.color ? event.color : "#4287f5";
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  const handleEventClick = (event) =>{
    setEventInfo({...event})
    setForm(true)
  }

  return (
    <>
      <div className="calendar">
        <DragAndDropCalendar
          selectable
          popup
          localizer={localizer}
          events={customEvents()}
          startAccessor="start"
          endAccessor="end"
          views={["month"]}
          style={{ height: 454 }}
          onDropFromOutside={handleDragDrop}
          eventPropGetter={handleEventStyle}
          onSelectEvent={handleEventClick}
          components={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </>
  );
};
