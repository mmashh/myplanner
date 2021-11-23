from flask_restful import Resource, reqparse
from models.itemModel import ItemModel, ItemTypeEnum, BooleanEnum
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flasgger import swag_from
import modules.itemModule as item_auxiliary_functions


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

   
    @swag_from('../swagger_documentation/item-post.yml')    
    def post(self):

        new_item_details = self.parser.parse_args()
        date_and_time = self.get_current_date_and_time()


        if new_item_details['item_type'] == ItemTypeEnum.note.value:
            is_complete = None
        elif new_item_details['item_type'] == ItemTypeEnum.task.value:
            is_complete = new_item_details.get('is_complete', None)

            if item_auxiliary_functions.not_valid_complete_state(is_complete):
                return {'error': 'Tasks should have a valid completion state: TRUE or FALSE'}, 422

        else:
            return {'error' : 'Item type incorrect'} , 422


        item_to_add = ItemModel(new_item_details['title'], new_item_details['body'], date_and_time, 
                                new_item_details['item_type'], is_complete)
        
        item_to_add.save_to_db()

        return {'message' : 'item successfully created'}, 201


# /item/{item_id}
class Item(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("title", type=str, required=True)
    parser.add_argument("body", type=str, required=True)
    parser.add_argument("item_type", type=str, required=True)
    parser.add_argument("is_complete", type=str)

    @swag_from('../swagger_documentation/item-get.yml')
    def get(self, item_id):

        item_requested = ItemModel.find_by_id(item_id)
        if item_requested is None:
            return {'message' : 'this item does not exist'}, 422
        else:
            return item_requested.convert_details_to_dict(), 200

    @swag_from('../swagger_documentation/item-delete.yml')
    def delete(self, item_id):

        item_to_delete = ItemModel.find_by_id(item_id)
        if item_to_delete is None:
            return {'message' : 'this item does not exist to begin with'}, 422
        else:
            item_to_delete.delete_from_db()

            return {'message' : 'item deleted'}, 200

    def put(self, item_id):
        item_to_update = ItemModel.find_by_id(item_id)
        if item_to_update is None:
            return {'message' : 'this item does not exist'}, 422

        given_data_to_update_with = self.parser.parse_args()

        item_to_update.title = given_data_to_update_with['title']
        item_to_update.body = given_data_to_update_with['body']
        item_to_update.item_type = given_data_to_update_with['item_type']

        if item_to_update.item_type == ItemTypeEnum.note.value:
            is_complete = None
        



        

        

        



        
# /item/all
class ItemAll(Resource):
    @swag_from('../swagger_documentation/item-get-all.yml')
    def get(self):

        all_items = []
        for item in ItemModel.get_all_items():
            all_items.append(item.convert_details_to_dict())
            
        return {'items':all_items}, 200

    @swag_from('../swagger_documentation/item-delete-all.yml')
    def delete(self):
        ItemModel.delete_all_items()
        return {'message' : 'all items deleted'}, 200

    