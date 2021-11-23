from flask_restful import Resource, reqparse
from myplanner.server.models.eventModel import EventModel
from flasgger import swag_from

# POST /event/add
class Eventadd(Resource):
    pass


# PUT /event/update


# DELETE /event/delete


# GET /event/all/{status}
class EventAll(Resource):
    def _get_all_unassigned(self):
        unassigned_events = []
        for event in EventModel.filter_by(EventModel.day.is_(None)).all():
            unassigned_events.append(event)

        return {"unassigned_events": unassigned_events}, 200

    def _get_all_assigned(self):
        assigned_events = []
        for event in EventModel.filter_by(EventModel.day.is_not(None)).all():
            assigned_events.append(event)

        return {"assigned_events": assigned_events}, 200

    @swag_from("../swagger_documentation/event-get-all.yaml")
    def get_all(self, status):
        if status == "unassigned":
            return self._get_all_unassigned()
        elif status == "assigned":
            return self._get_all_assigned()
        else:
            return {"message": "invalid event status requested"}, 400
