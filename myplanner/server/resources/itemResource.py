from flask_restful import Resource, reqparse
from models.userModel import UserModel
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flasgger import swag_from

# /item/add
class ItemAdd(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("title", type=str, required=True)
    parser.add_argument("body", type=str, required=True)
    parser.add_argument("item_type", type=str, required=True)
    parser.add_argument("is_complete", type=str)

    # @swag_from('../swagger_documentation/user-register.yml')    
    def post(self):

        return {'message': 'hit this endpoint'}

        # new_user_details = self.parser.parse_args()
        # preexisting_user_with_this_username = UserModel.find_by_username(new_user_details['username'])
        
        # if preexisting_user_with_this_username is None:
        #     user_to_add = UserModel(new_user_details['username'], new_user_details['password'])
        #     user_to_add.save_to_db()
        #     return {'message': 'user created'}, 201
        # else:
        #     return {'message': 'this user already exists in the DB'}, 422
