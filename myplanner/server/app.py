from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flasgger import Swagger
from flask_cors import CORS

from db import db
from resources.userResource import UserRegister, UserAll, UserLogin, UserDelete, UserLogout, AllBlockedTokens
from resources.itemResource import ItemAdd, ItemAll, Item, ItemAllSpecificUser
from resources.eventResource import (
    EventAdd,
    EventEdit,
    EventGetUnassigned,
    EventGetAssigned,
    EventGetUpcoming,
)

from models.blockListModel import TokenBlocklistModel 

def init_app():

    app = Flask(__name__)
    app.secret_key = "abcd"  # To-do: Should change this to an autogenerated string
    app.config["SQLALCHEMY_TRACK_MODFIFICATIONS"] = False
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"

    Swagger(app)
    jwt = JWTManager(app)
    CORS(app)

    
    return app, jwt


def add_routes(app):

    api = Api(app)
    api.add_resource(UserRegister, "/user/register")
    api.add_resource(UserAll, "/user/all")
    api.add_resource(UserLogin, "/user/login")
    api.add_resource(UserLogout, "/user/logout")
    api.add_resource(AllBlockedTokens, "/user/blocked_tokens/all/admin")
    api.add_resource(UserDelete, "/user/delete/<int:id>")

    api.add_resource(ItemAllSpecificUser, "/item/all")
    api.add_resource(ItemAll, "/item/all/admin")
    api.add_resource(ItemAdd, "/item/add")
    api.add_resource(Item, "/item/<int:item_id>")

    api.add_resource(EventAdd, "/event/")
    api.add_resource(EventEdit, "/event/<int:event_id>")
    api.add_resource(EventGetUnassigned, "/event/all/unassigned")
    api.add_resource(EventGetAssigned, "/event/all/assigned")
    api.add_resource(EventGetUpcoming, "/event/upcoming/<int:no_weeks_to_look_ahead>")

    return app


if __name__ == "__main__":

    app, jwt = init_app()

    app = add_routes(app)

    @app.before_first_request
    def create_tables():
        db.create_all()
    db.init_app(app)


    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        token = TokenBlocklistModel.get_blocked_jwt(jti)
        return token is not None


    app.run(host="0.0.0.0", port="5000", debug=True)
