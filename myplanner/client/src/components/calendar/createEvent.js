import React from "react";

export const CreateEvent = ({
  eventInfo,
  addEvent,
  changeEvent,
  updateEvent,
  deleteEvent,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (eventInfo.title == "") return alert("please enter title");
    addEvent(eventInfo);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (eventInfo.title == "") return alert("please enter title");
    updateEvent(eventInfo);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteEvent(eventInfo);
  };

  const generateButtons = () => {
    return (
      <>
        {eventInfo.event_id !== "" ? (
          <div className="updateEvent">
            <button
              onClick={handleUpdate}
              type="submit"
              className="btn btn-primary"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              type="submit"
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Create
          </button>
        )}
      </>
    );
  };
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">
            {eventInfo.event_id !== "" ? "Update Event" : "Create An Event"}
          </h5>
          <form>
            <div className="form-group mb-2">
              <label htmlFor="title mb-2">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={changeEvent}
                value={eventInfo.title}
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="body mb-2">Body</label>
              <textarea
                className="form-control"
                id="body"
                rows="3"
                name="body"
                onChange={changeEvent}
                value={eventInfo.body}
              ></textarea>
            </div>
            {eventInfo.event_id !== "" && (
              <div className="form-group mb-2">
                <label htmlFor="title mb-2">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="datetime"
                  onChange={changeEvent}
                  value={eventInfo.datetime}
                  required
                />
              </div>
            )}
            <div className="form-group mb-2">
              <label htmlFor="color mb-2">Color</label>
              <input
                className="form-control eventcolor"
                type="color"
                id="color"
                name="color"
                onChange={changeEvent}
                value={eventInfo.color}
              />
            </div>
            {generateButtons()}
          </form>
        </div>
      </div>
    </>
  );
};
