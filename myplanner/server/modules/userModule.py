from flask_jwt_extended import get_jwt_identity



def get_user_id():
    identifiers_in_jwt = get_jwt_identity()
    user_id = identifiers_in_jwt['id']
    return user_id