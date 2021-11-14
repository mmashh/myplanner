from flask_restful import Resource, reqparse

# /user/register
class UserRegister(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, required=True)
    parser.add_argument("password", type=str, required=True)

    def get(self):
        return {'message': 'hit this endpoint'}, 200
        
