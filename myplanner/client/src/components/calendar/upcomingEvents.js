import React from 'react';
import {
  Row,
  Col,
  Form
} from 'react-bootstrap'
import {CircleFill} from 'react-bootstrap-icons';


const UpcomingEvents = function({upcomingEvents, setNumWeeks}){
  
  const handleChange = function(e){
    var numWeeks = parseInt(e.target.value);
    setNumWeeks(numWeeks);
  }

  return (
    <Col md={12} className='upcoming-events h-100'>
      <Row md={2} className="mb-3">
        <Col xs={8}>
          <h3>Upcoming Events</h3>
        </Col>
        <Col xs={4}>
          <Form.Select id="num-weeks" onChange={handleChange}>
            <option value={1}>1 week</option>
            <option value={2}>2 weeks</option>
            <option value={4}>1 month</option>
            <option value={8}>2 months</option>
          </Form.Select>
        </Col>
      </Row>
      <Row md={10} >
        {upcomingEvents.map(function(event){
          return (
            <Row key={event.event_id} className="upcoming-event-item my-1">
              <Col xs={1} className="upcoming-event-color">
                <CircleFill color={event.color}/>
              </Col>
              <Col xs={7} className="upcoming-event-title">
                {event.title}
              </Col>
              <Col xs={4} className="upcoming-event-date">
                {event.datetime.split(' ')[0]}
              </Col>
            </Row>
          )
        })}
      </Row>
    </Col>
  );
}


export default UpcomingEvents;