import React from "react";

export const CreateEvent = ({
  eventInfo,
  addEvent,
  changeEvent,
  updateEvent,
  deleteEvent,
  closeCard
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (eventInfo.title === "") return alert("please enter title");
    addEvent(eventInfo);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (eventInfo.title === "") return alert("please enter title");
    updateEvent(eventInfo);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventInfo);
    }
  };

  const handleClose = (event) => {
    event.preventDefault();
    closeCard();
  }

  const generateButtons = () => {
    return (
      <>
        <div className="cancelButtonContainer">
          <button
            onClick={handleClose}
            className="btn btn-secondary">
            Cancel
          </button>
        </div>
        <div className="eventButtonContainer">
          {eventInfo.event_id !== "" ? (
            <>              <button
                onClick={handleDelete}
                type="submit"
                className="btn btn-danger"
              >
                Delete
              </button>
              <button
                onClick={handleUpdate}
                type="submit"
                className="btn btn-primary"
              >
                Update
              </button>
            </>
          ) : (
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Create
            </button>
          )}
        </div>
      </>
    );
  };
  return (
    <>
      <div className="card h-100">
        <div classname="card-header">
          <h5 className="card-title text-center">
              {eventInfo.event_id !== "" ? "Update Event" : "Create An Event"}
          </h5>
        </div>
        <div className="card-body">
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
