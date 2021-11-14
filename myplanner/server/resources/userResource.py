from flask_restful import Resource, reqparse
from models.userModel import UserModel


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



# /user/all
class UserAll(Resource):

    def get(self):

        all_users = {'users' : [
            user.convert_details_to_dict()
        ] for user in UserModel.examine_table_contents()}

        return all_users

        
