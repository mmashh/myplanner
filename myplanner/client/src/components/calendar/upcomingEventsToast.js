import React from 'react';
import {
  Row,
  Toast,
  ToastContainer
} from 'react-bootstrap';

function UpcomingEventsToast({upcomingEvents, show, handleClose}) {


  const hasUpcomingEvents = () => {
    return (Array.isArray(upcomingEvents) && upcomingEvents.length > 0);
  }

  const introStatement = () =>{
    if (hasUpcomingEvents()) {
      return <span>Hello there! These are the events due this week:</span>
    } else {
      return <span>Hello there! There are no events due this week.</span>
    }
  }

  const upcomingEventsList = () => {
    if (hasUpcomingEvents()){
      return (
        <table className="m-4">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {upcomingEvents.map((event) => {
              return (
                <tr key={event.event_id}>
                  <td><span>{event.title}</span></td>
                  <td>
                    <span>{event.datetime.split(' ')[0]}</span>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      )
    } else {
      return null;
    }
  }

  return (
    <ToastContainer  position="bottom-end" className="m-5">
      <Toast className="toast" bg="secondary" show={show} onClose={handleClose} autohide={true} delay={(hasUpcomingEvents())  ? 10000 : 4000}>
        <Toast.Header>
          <strong className="m-auto">Events this week...</strong>
        </Toast.Header>
        <Toast.Body>
          <Row>
            {introStatement()}
          </Row>
          <Row>
            {upcomingEventsList()}
          </Row>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default UpcomingEventsToast;