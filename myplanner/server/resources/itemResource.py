from flask_restful import Resource, reqparse
from models.userModel import ItemModel, ItemTypeEnum
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

    def get_current_date_and_time(self):

        from datetime import datetime

        now_date_obj = datetime.now()
        desired_format_date_and_time = now_date_obj.strftime("%d/%m/%Y %H:%M")

        return desired_format_date_and_time

    def set_is_complete_value(new_item_details):

        if new_item_details['item_type'] == ItemTypeEnum.note.value:
            is_complete = None
        elif new_item_details['item_type'] == ItemTypeEnum.task.value:

            is_complete = new_item_details.get('is_complete', None)
        
            if is_complete is None:
                raise TypeError('Tasks should have a completion state')
            
        else:
            raise TypeError('Item type incorrect')

        return is_complete

    # @swag_from('../swagger_documentation/user-register.yml')    
    def post(self):

        new_item_details = self.parser.parse_args()
        date_and_time = self.get_current_date_and_time()

        is_complete = self.set_is_complete_value(new_item_details)

        item_to_add = ItemModel(new_item_details['title'], new_item_details['body'], date_and_time, 
                                new_item_details['item_type'], is_complete)
        
        item_to_add.save_to_db()

        # preexisting_user_with_this_username = UserModel.find_by_username(new_user_details['username'])
        
        # if preexisting_user_with_this_username is None:
        #     user_to_add = UserModel(new_user_details['username'], new_user_details['password'])
        #     user_to_add.save_to_db()
        #     return {'message': 'user created'}, 201
        # else:
        #     return {'message': 'this user already exists in the DB'}, 422
