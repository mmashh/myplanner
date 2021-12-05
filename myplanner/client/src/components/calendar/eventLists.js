import React from "react";

export const EventLists = ({unassignedLists,handleDrag}) => {
  return (
    <>
      <div className="eventlists">
        <h3>Unassigned Events</h3>
        <div className="unassigned">
          {unassignedLists.map((event,key) => (
            <span key={key} onDragStart={()=>handleDrag(event)} draggable="true" className="btn btn-primary m-1" style={{backgroundColor:`${event.color ? event.color:'#0d6efd'}`}}>
              {event.title}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
