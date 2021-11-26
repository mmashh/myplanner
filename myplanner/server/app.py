from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flasgger import Swagger
from flask_cors import CORS
from db import db
from resources.userResource import UserRegister, UserAll, UserLogin, UserDelete
from resources.itemResource import ItemAdd, ItemAll, Item
from resources.eventResource import (
    EventAdd,
    EventEdit,
    EventGetUnassigned,
    EventGetAssigned,
)


def init_app():

    app = Flask(__name__)
    app.secret_key = "abcd"  # To-do: Should change this to an autogenerated string
    app.config["SQLALCHEMY_TRACK_MODFIFICATIONS"] = False
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"

    swagger = Swagger(app)
    jwt = JWTManager(app)

    cors = CORS(app)

    return app


def add_routes(app):

    api = Api(app)
    api.add_resource(UserRegister, "/user/register")
    api.add_resource(UserAll, "/user/all")
    api.add_resource(UserLogin, "/user/login")
    api.add_resource(UserDelete, "/user/delete/<int:id>")
    api.add_resource(ItemAdd, "/item/add")
    api.add_resource(ItemAll, "/item/all")
    api.add_resource(Item, "/item/<int:item_id>")
    api.add_resource(EventAdd, "/event/")
    api.add_resource(EventEdit, "/event/<int:event_id>")
    api.add_resource(EventGetUnassigned, "/event/all/unassigned")
    api.add_resource(EventGetAssigned, "/event/all/assigned")

    return app


if __name__ == "__main__":

    app = init_app()
    app = add_routes(app)

    @app.before_first_request
    def create_tables():
        db.create_all()

    db.init_app(app)

    app.run(host="0.0.0.0", port="5000", debug=True)
