from datetime import datetime
from abc import abstractmethod

from flask_restful import Resource, reqparse
from flasgger import swag_from

from models.eventModel import EventModel


class EventAdd(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("title", type=str, required=True)
    parser.add_argument("body", type=str, required=False)

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

    def validate_event_exits(func):
        def inner(*args, **kwargs):
            target = EventModel.find_by_id(kwargs["event_id"])
            if target is None:
                return {"message": "No event with specified id was found"}, 422
            else:
                args = (*args, target)
                del kwargs["event_id"]
                return func(*args, **kwargs)

        return inner

    # PUT /event/{event_id}
    @swag_from("../swagger_documentation/event-put.yml")
    @validate_event_exits
    def put(self, event_to_update):
        self.parser.add_argument("title", type=str, default=event_to_update.title)
        self.parser.add_argument("body", type=str, default=event_to_update.body)
        self.parser.add_argument("date", type=str, default=event_to_update.date)
        new_event_attributes = self.parser.parse_args()

        if new_event_attributes["title"] is None or new_event_attributes["title"] == "":
            return {"message": "Title cannot be set to null"}, 400

        event_to_update.title = new_event_attributes["title"]
        event_to_update.body = new_event_attributes["body"]
        try:
            event_to_update.date = datetime.strptime(
                new_event_attributes["date"], r"%d/%m/%Y %H:%M"
            )
        except ValueError:
            return {
                "message": "Incorrect datetime format. Datetime must be in 'DD/MM/YYYY hh:mm' format"
            }, 400
        except TypeError:
            pass  # This should be occuring when no date was provided. If that's the case it is valid.

        event_to_update.save_to_db()

        return {"message": "Event successfully updated"}, 200

    # DELETE /event/{event_id}
    @swag_from("../swagger_documentation/event-delete.yml")
    @validate_event_exits
    def delete(self, event_to_delete):
        event_to_delete.delete_from_db()

        return {"message": "Event deleted"}, 200


class EventGet(Resource):
    def _select_where(self, filter_condition):
        targets = []
        for target in EventModel.get_all_where(filter_condition):
            targets.append(target.to_dict())

        return targets

    @abstractmethod
    def get(self):
        pass


class EventGetUnassigned(EventGet):
    # GET /event/all/unassigned
    @swag_from("../swagger_documentation/event-get-unassigned.yml")
    def get(self):
        unassigned_events = self._select_where(EventModel.date.is_(None))

        return {"unassigned_events": unassigned_events}, 200


class EventGetAssigned(EventGet):
    # GET /event/all/assigned
    @swag_from("../swagger_documentation/event-get-assigned.yml")
    def get(self):
        assigned_events = self._select_where(EventModel.date.is_not(None))

        return {"assigned_events": assigned_events}, 200
