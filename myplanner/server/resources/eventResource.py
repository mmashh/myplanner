from flask_restful import Resource, reqparse
from models.eventModel import EventModel
from flasgger import swag_from


class Event(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("title", type=str, required=True)
    parser.add_argument("body", type=str, required=True)
    parser.add_argument("date", type=str, required=False)

    # POST /event/
    @swag_from("../swagger_documentation/event-post.yml")
    def post(self):
        new_event_attributes = self.parser.parse_args()

        event_to_add = EventModel(
            new_event_attributes["title"], new_event_attributes["body"]
        )
        event_to_add.save_to_db()

        return {"message": "Event successfully created"}, 201

    # PUT /event/
    @swag_from("../swagger_documentation/event-put.yml")
    def put(self):
        pass

    # DELETE /event/
    @swag_from("../swagger_documentation/event-delete.yml")
    def delete(self):
        pass


class EventUnassigned(Resource):
    # TODO: extract query method

    # GET /event/all/unassigned
    @swag_from("../swagger_documentation/event-get-unassigned.yml")
    def get(self):
        unassigned_events = []
        for event in EventModel.query.filter(EventModel.date.is_(None)).all():
            unassigned_events.append(event.to_dict())

        return {"unassigned_events": unassigned_events}, 200


class EventAssigned(Resource):
    # GET /event/all/assigned
    @swag_from("../swagger_documentation/event-get-assigned.yml")
    def get(self):
        assigned_events = []
        for event in EventModel.query.filter(EventModel.date.is_not(None)).all():
            assigned_events.append(event.to_dict())

        return {"assigned_events": assigned_events}, 200
