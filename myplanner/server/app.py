from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flasgger import Swagger
from flask_cors import CORS
from db import db
from resources.userResource import UserRegister, UserAll, UserLogin


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


    return app


if __name__ == "__main__":

    app = init_app()
    app = add_routes(app)

    @app.before_first_request
    def create_tables():
        db.create_all()

    db.init_app(app)

    app.run(host="0.0.0.0", port="5000", debug=True)
