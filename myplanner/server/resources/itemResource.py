from flask_restful import Resource, reqparse
from models.itemModel import ItemModel, ItemTypeEnum, BooleanEnum
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

    def not_valid_boolean(self, is_complete):

        if (is_complete is None):  
            return True
        elif (is_complete != BooleanEnum.true.value and is_complete != BooleanEnum.false.value):
            return True
        else:
            return False


    # @swag_from('../swagger_documentation/user-register.yml')    
    def post(self):

        new_item_details = self.parser.parse_args()
        date_and_time = self.get_current_date_and_time()


        if new_item_details['item_type'] == ItemTypeEnum.note.value:
            is_complete = None
        elif new_item_details['item_type'] == ItemTypeEnum.task.value:
            is_complete = new_item_details.get('is_complete', None)
        
            if self.not_valid_boolean(is_complete):
                return {'error': 'Tasks should have a valid completion state: TRUE or FALSE'}, 422
        else:
            return {'error' : 'Item type incorrect'} , 422


        item_to_add = ItemModel(new_item_details['title'], new_item_details['body'], date_and_time, 
                                new_item_details['item_type'], is_complete)
        
        item_to_add.save_to_db()

        return {'message' : 'item successfully created'}, 201


# /item/{item_id}
class Item(Resource):

    def get(self, item_id):

        item_requested = ItemModel.find_by_id(item_id)
        if item_requested is None:
            return {'message' : 'this item does not exist'}, 422
        else:
            return item_requested.convert_details_to_dict(), 200

    def delete(self, item_id):

        item_to_delete = ItemModel.find_by_id(item_id)
        if item_to_delete is None:
            return {'message' : 'this item does not exist to begin with'}, 422
        else:
            item_to_delete.delete_from_db()

            return {'message' : 'item deleted'}, 200



        
# /item/all
class ItemAll(Resource):

    def get(self):

        # all_items = {'items' : [
        #     item.convert_details_to_dict()
        # ] for item in ItemModel.get_all_items()}

        all_items = []
        for item in ItemModel.get_all_items():
            all_items.append(item.convert_details_to_dict())
            
        return all_items, 200

    def delete(self):
        ItemModel.delete_all_items()
        return {'message' : 'all items deleted'}, 200