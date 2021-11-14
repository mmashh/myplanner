from flask_restful import Resource, reqparse
from models.userModel import UserModel
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# /user/register
class UserRegister(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, required=True)
    parser.add_argument("password", type=str, required=True)

    def post(self):

        new_user_details = self.parser.parse_args()
        user_to_add = UserModel(new_user_details['username'], new_user_details['password'])
        user_to_add.save_to_db()

        return {'message': 'user created'}, 201


# /user/login
class UserLogin(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, required=True)
    parser.add_argument("password", type=str, required=True)

    def post(self):

        login_information = self.parser.parse_args()
        user = UserModel.find_by_username(login_information["username"])

        if user and safe_str_cmp(user.password, login_information["password"]):

            identifying_values = {
                "id": user.id,
                "username": user.username,
            }

            access_token = create_access_token(identity=identifying_values, fresh=True)

            return {
                "access_token": access_token,
            }, 200

        return {"message": "invalid credentials"}, 401




# /user/all
class UserAll(Resource):

    def get(self):

        all_users = {'users' : [
            user.convert_details_to_dict()
        ] for user in UserModel.examine_table_contents()}

        return all_users

        
