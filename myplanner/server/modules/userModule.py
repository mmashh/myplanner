from flask_jwt_extended import get_jwt_identity
from models.itemModel import ItemModel


def get_user_id():
    identifiers_in_jwt = get_jwt_identity()
    user_id = identifiers_in_jwt['id']
    return user_id

def user_can_access_this_item(user_id, item_id):
    requested_item = ItemModel.find_by_id(item_id)

    if requested_item.created_by == user_id:
        return True
    else:
        return False


