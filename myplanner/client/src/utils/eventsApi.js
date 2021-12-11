import apiHelpers from "./apiHelpers";
import handlePromiseError from "./handlePromiseError";
const eventCreate = async (props) => {
  try {
    let eventInfo = {
      title: props.title,
      body: props.body,
      color: props.color,
    };
    return await apiHelpers.httpPost("/event", eventInfo);
  } catch (err) {
    return handlePromiseError(err);
  }
};

const unassignedLists = async () => {
  try {
    const response = await apiHelpers.httpGet("/event/all/unassigned");
    return response.data?.unassigned_events;
  } catch (err) {
    return handlePromiseError(err);
  }
};

const assignedLists = async () => {
  try {
    const response = await apiHelpers.httpGet("/event/all/assigned");
    return response.data?.assigned_events;
  } catch (err) {
    return handlePromiseError(err);
  }
};

const getUpcomingEvents = async (numWeeks) => {
  try {
    const response = await apiHelpers.httpGet(`/event/upcoming/${numWeeks}`);
    return (response.data) ? response.data["upcoming events"] : [];
  } catch (err) {
    return handlePromiseError(err);
  }
}

const eventEdit = async (props) => {
  try {
    return await apiHelpers.httpPut(`/event/${props.event_id}`, {
      ...props,
    });
  } catch (err) {
    return handlePromiseError(err);
  }
};

const eventDelete = async (props) => {
  try {
    return await apiHelpers.httpDelete(`/event/${props.event_id}`);
  } catch (err) {
    return handlePromiseError(err);
  }
};

const eventApi = {
  eventUnassignedList: unassignedLists,
  eventAssignedList: assignedLists,
  getUpcomingEvents: getUpcomingEvents,
  newEvent: eventCreate,
  eventEdit: eventEdit,
  eventDelete: eventDelete,
};

export default eventApi;
