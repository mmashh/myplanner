import React, {useState,useEffect} from 'react';
import {
  Row,
  Col,
  Form
} from 'react-bootstrap'
import {CircleFill} from 'react-bootstrap-icons';


const UpcomingEvents = function({getUpcomingEvents}){

  let [upcomingEvents,setUpcomingEvents] = useState([]);

  useEffect(function(){
    const initEvents = async ()=>{
      setUpcomingEvents(await getUpcomingEvents(1));
    }

    initEvents();
  },[])
  
  const handleChange = async function(e){
    var numWeeks = parseInt(e.target.value);
    var events = await getUpcomingEvents(numWeeks);
    setUpcomingEvents(events);
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
            <Row className="upcoming-event-item my-1">
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