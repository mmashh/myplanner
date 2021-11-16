from flask_restful import Resource, reqparse
from models.itemModel import ItemModel, ItemTypeEnum
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


    # @swag_from('../swagger_documentation/user-register.yml')    
    def post(self):

        new_item_details = self.parser.parse_args()
        date_and_time = self.get_current_date_and_time()


        if new_item_details['item_type'] == ItemTypeEnum.note.value:
            is_complete = None
        elif new_item_details['item_type'] == ItemTypeEnum.task.value:
            is_complete = new_item_details.get('is_complete', None)
        
            if is_complete is None:
                return {'error': 'Tasks should have a completion state'}, 422
        else:
            return {'error' : 'Item type incorrect'} , 422


        item_to_add = ItemModel(new_item_details['title'], new_item_details['body'], date_and_time, 
                                new_item_details['item_type'], is_complete)
        
        item_to_add.save_to_db()

        return {'message' : 'item successfully created'}, 201

        # preexisting_user_with_this_username = UserModel.find_by_username(new_user_details['username'])
        
        # if preexisting_user_with_this_username is None:
        #     user_to_add = UserModel(new_user_details['username'], new_user_details['password'])
        #     user_to_add.save_to_db()
        #     return {'message': 'user created'}, 201
        # else:
        #     return {'message': 'this user already exists in the DB'}, 422



# /item/all
class ItemAll(Resource):

    def get(self):

        all_items = {'items' : [
            item.convert_details_to_dict()
        ] for item in ItemModel.examine_table_contents()}

        return all_items