import apiHelpers from "./apiHelpers";

const eventCreate = async (props) => {
  let eventInfo = {
    title: props.title,
    body: props.body,
    color: props.color,
  };
  const response = await apiHelpers.httpPost("/event/", eventInfo);
  return response;
};

const unassignedLists = async () => {
  const response = await apiHelpers.httpGet("/event/all/unassigned");
  return response.data?.unassigned_events;
};

const assignedLists = async () => {
  const response = await apiHelpers.httpGet("/event/all/assigned");
  return response.data?.assigned_events;
};

const upcomingLists = async (numWeeks) => {
  const response = await apiHelpers.httpGet(`/event/upcoming/${numWeeks}`);
  // TODO: FIX API CALL
  if (response.data){
    return response.data["upcoming events"];
  }
}

const eventEdit = async (props) => {
  const response = await apiHelpers.httpPut(`/event/${props.event_id}`, {
    ...props,
  });
  return response;
};

const eventDelete = async (props) => {
  var response = await apiHelpers.httpDelete(`/event/${props.event_id}`);
  return response;
};

const eventApi = {
  eventUnassignedList: unassignedLists,
  eventAssignedList: assignedLists,
  getUpcomingEvents: upcomingLists,
  newEvent: eventCreate,
  eventEdit: eventEdit,
  eventDelete: eventDelete,
};

export default eventApi;
