from flask_restful import Resource, reqparse
from models.itemModel import ItemModel
from flask_jwt_extended import jwt_required
from flasgger import swag_from
import modules.itemModule as itemModule
import modules.userModule as userModule
import modules.constants as const


# /item/add
class ItemAdd(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("title", type=str, required=True)
    parser.add_argument("body", type=str, required=True)
    parser.add_argument("item_type", type=str, required=True)
    parser.add_argument("is_complete", type=str)

    @jwt_required()
    @swag_from("../swagger_documentation/item/item-post.yml")
    def post(self):

        this_users_id = userModule.get_user_id()
        new_item_details = self.parser.parse_args()
        date_and_time = itemModule.get_current_date_and_time(const.DATETIME_FORMAT)

        is_complete, error = itemModule.verify_item_type_and_completion_state(
            new_item_details
        )
        if error is not None:
            return error, 422

        item_to_add = ItemModel(
            new_item_details["title"],
            new_item_details["body"],
            date_and_time,
            new_item_details["item_type"],
            is_complete,
            this_users_id,
        )

        item_to_add.save_to_db()

        return {"message": "item successfully created"}, 201


# /item/{item_id}
class Item(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("title", type=str, required=True)
    parser.add_argument("body", type=str, required=True)
    parser.add_argument("item_type", type=str, required=True)
    parser.add_argument("is_complete", type=str)

    @jwt_required()
    @swag_from("../swagger_documentation/item/item-get.yml")
    def get(self, item_id):

        item_requested = ItemModel.find_by_id(item_id)
        if item_requested is None:
            return {"message": "this item does not exist"}, 422

        this_users_id = userModule.get_user_id()
        if not userModule.user_can_access_this_item(this_users_id, item_id):
            return {"error": "users can only access items they have created"}, 401

        return item_requested.convert_details_to_dict(), 200

    @jwt_required()
    @swag_from("../swagger_documentation/item/item-delete.yml")
    def delete(self, item_id):

        item_to_delete = ItemModel.find_by_id(item_id)
        if item_to_delete is None:
            return {"message": "this item does not exist to begin with"}, 422

        this_users_id = userModule.get_user_id()
        if not userModule.user_can_access_this_item(this_users_id, item_id):
            return {"error": "users can only access items they have created"}, 401

        item_to_delete.delete_from_db()

        return {"message": "item deleted"}, 200

    @jwt_required()
    @swag_from("../swagger_documentation/item/item-put.yml")
    def put(self, item_id):

        item_to_update = ItemModel.find_by_id(item_id)
        if item_to_update is None:
            return {"message": "this item does not exist"}, 422

        this_users_id = userModule.get_user_id()
        if not userModule.user_can_access_this_item(this_users_id, item_id):
            return {"error": "users can only access items they have created"}, 401

        given_data_to_update_with = self.parser.parse_args()
        is_complete, error = itemModule.verify_item_type_and_completion_state(
            given_data_to_update_with
        )
        if error is not None:
            return error, 422

        item_to_update.title = given_data_to_update_with["title"]
        item_to_update.body = given_data_to_update_with["body"]
        item_to_update.item_type = given_data_to_update_with["item_type"]
        item_to_update.is_complete = is_complete

        item_to_update.save_to_db()

        return {"message": "item updated"}, 200


# /item/all
class ItemAllSpecificUser(Resource):
    @jwt_required()
    @swag_from("../swagger_documentation/item/item-get-all.yml")
    def get(self):

        this_users_id = userModule.get_user_id()

        all_items_created_by_this_user = []
        for item in ItemModel.get_all_items_created_by_specific_user(this_users_id):
            all_items_created_by_this_user.append(item.convert_details_to_dict())

        return {"items_created_by_this_user": all_items_created_by_this_user}, 200


# /item/all/admin
class ItemAll(Resource):
    @swag_from("../swagger_documentation/item/item-get-all-admin.yml")
    def get(self):

        all_items = []
        for item in ItemModel.get_all_items():
            all_items.append(item.convert_details_to_dict())

        return {"items": all_items}, 200

    @swag_from("../swagger_documentation/item/item-delete-all.yml")
    def delete(self):
        ItemModel.delete_all_items()
        return {"message": "all items deleted"}, 200
