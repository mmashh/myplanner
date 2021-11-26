from flask_restful import Resource, reqparse
from models.eventModel import EventModel
from flasgger import swag_from


class EventAdd(Resource):
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


class EventEdit(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("title", type=str, required=False)
    parser.add_argument("body", type=str, required=False)
    parser.add_argument("date", type=str, required=False)
    
    # PUT /event/
    @swag_from("../swagger_documentation/event-put.yml")
    def put(self):
        pass

    # DELETE /event/
    @swag_from("../swagger_documentation/event-delete.yml")
    def delete(self, event_id):
        event_to_delete = EventModel.find_by_id(event_id)
        if event_to_delete is None:
            return {"message": "No event with specified id was found"}, 422
        else:
            event_to_delete.delete_from_db()

            return {"message": "Event deleted"}, 200


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
