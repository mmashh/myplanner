from datetime import datetime
from abc import abstractmethod

from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, verify_jwt_in_request
from flasgger import swag_from

from models.eventModel import EventModel
import modules.userModule as userModule


# POST /event/
class EventAdd(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("title", type=str, required=True)
    parser.add_argument("body", type=str, required=False)

    @jwt_required()
    @swag_from("../swagger_documentation/event-post.yml")
    def post(self):
        owner_id = userModule.get_user_id()
        new_event_attributes = self.parser.parse_args()

        event_to_add = EventModel(
            new_event_attributes["title"], new_event_attributes["body"], owner_id
        )
        event_to_add.save_to_db()

        return {"message": "Event successfully created"}, 201


# PUT /event/{event_id}
# DELETE /event/{event_id}
class EventEdit(Resource):
    parser = reqparse.RequestParser()

    def validate_event_exits(func):
        def inner(*args, **kwargs):
            ids = {}
            ids["event_id"] = kwargs["event_id"]
            ids["created_by"] = userModule.get_user_id()
            target = EventModel.find_by_id(ids)
            if target is None:
                return {"message": "No event with specified id was found"}, 422
            else:
                args = (*args, target)
                del kwargs["event_id"]
                return func(*args, **kwargs)

        return inner

    @jwt_required()
    @swag_from("../swagger_documentation/event-put.yml")
    @validate_event_exits
    def put(self, event_to_update):
        self.parser.add_argument("title", type=str, default=event_to_update.title)
        self.parser.add_argument("body", type=str, default=event_to_update.body)
        self.parser.add_argument("datetime", type=str, default=event_to_update.datetime)
        new_event_attributes = self.parser.parse_args()

        if new_event_attributes["title"] is None or new_event_attributes["title"] == "":
            return {"message": "Title cannot be set to null"}, 400

        event_to_update.title = new_event_attributes["title"]
        event_to_update.body = new_event_attributes["body"]
        try:
            event_to_update.datetime = datetime.strptime(
                new_event_attributes["datetime"], r"%d/%m/%Y %H:%M"
            )
        except ValueError:
            return {
                "message": "Incorrect datetime format. Datetime must be in 'DD/MM/YYYY hh:mm' format"
            }, 400
        except TypeError:
            event_to_update.datetime = None

        event_to_update.save_to_db()

        return {"message": "Event successfully updated"}, 200

    @jwt_required()
    @swag_from("../swagger_documentation/event-delete.yml")
    @validate_event_exits
    def delete(self, event_to_delete):
        event_to_delete.delete_from_db()

        return {"message": "Event deleted"}, 200


class EventGet(Resource):

    def select_where_created_by_this_user_and(self, added_filter_condition):

        targets = []
        owner_id = userModule.get_user_id()
        default_filter_condition = EventModel.created_by.is_(owner_id)

        if added_filter_condition is None:
            filter_conditions = (default_filter_condition,)
            print(filter_conditions)
        else:
            filter_conditions = (added_filter_condition, default_filter_condition)
            print(filter_conditions)
            
        for target in EventModel.get_all_where(filter_conditions):
            targets.append(target.to_dict())

        return targets

    @abstractmethod
    def get(self):
        pass


# GET /event/all/unassigned
class EventGetUnassigned(EventGet):
    @jwt_required()
    @swag_from("../swagger_documentation/event-get-unassigned.yml")
    def get(self):
        unassigned_events = self.select_where_created_by_this_user_and(EventModel.datetime.is_(None))

        return {"unassigned_events": unassigned_events}, 200


# GET /event/all/assigned
class EventGetAssigned(EventGet):
    @jwt_required()
    @swag_from("../swagger_documentation/event-get-assigned.yml")
    def get(self):
        assigned_events = self.select_where_created_by_this_user_and(EventModel.datetime.is_not(None))

        return {"assigned_events": assigned_events}, 200


class EventGetUpcoming(EventGet):

    def to_timestamp_since_epoch(self, time):
        from datetime import datetime
        now_date_obj = datetime.now()
        current_timestamp = now_date_obj.timestamp() 
        print(type(now_date_obj))
        print(now_date_obj.timestamp())


    def get(self, no_weeks_to_look_ahead):
        all_assigned_events = self.select_where_created_by_this_user_and(EventModel.datetime.is_not(None))
        self.convert_all_event_date_time_to_secs_since_epoch(all_assigned_events)

        return {'message' : 'hit this endpoint'}, 200
