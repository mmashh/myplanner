from flask_restful import Resource, reqparse
from models.userModel import UserModel
from models.blockListModel import TokenBlocklistModel
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    get_jwt,
)
from flasgger import swag_from
from datetime import datetime
from datetime import timedelta

# /user/register
class UserRegister(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, required=True)
    parser.add_argument("password", type=str, required=True)

    @swag_from("../swagger_documentation/user-register.yml")
    def post(self):

        new_user_details = self.parser.parse_args()
        preexisting_user_with_this_username = UserModel.find_by_username(
            new_user_details["username"]
        )

        if preexisting_user_with_this_username is None:
            user_to_add = UserModel(
                new_user_details["username"], new_user_details["password"]
            )
            user_to_add.save_to_db()
            return {"message": "user created"}, 201
        else:
            return {"message": "this user already exists in the DB"}, 422


# user/delete/<int: id>
class UserDelete(Resource):
    @swag_from("../swagger_documentation/user-delete.yml")
    def delete(self, id_of_user_to_delete):
        user_to_delete = UserModel.find_by_id(id_of_user_to_delete)

        if user_to_delete is None:
            return {"message": "this user does not exist in the DB"}, 422

        else:
            user_to_delete.delete_from_db()
            return {"message": "user deleted"}, 200


# /user/login
class UserLogin(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, required=True)
    parser.add_argument("password", type=str, required=True)

    @swag_from("../swagger_documentation/user-login.yml")
    def post(self):

        login_information = self.parser.parse_args()
        user = UserModel.find_by_username(login_information["username"])

        if user and safe_str_cmp(user.password, login_information["password"]):

            identifying_values = {
                "id": user.id,
                "username": user.username,
            }

            time_till_token_expires = timedelta(hours=1)

            access_token = create_access_token(
                identity=identifying_values,
                fresh=True,
                expires_delta=time_till_token_expires,
            )

            return {
                "access_token": access_token,
            }, 200

        return {"message": "invalid credentials"}, 422


# /user/logout
class UserLogout(Resource):
    @jwt_required()
    @swag_from("../swagger_documentation/user-logout.yml")
    def post(self):
        jti = get_jwt()["jti"]
        expiry = get_jwt()["exp"]
        now = datetime.now().timestamp()
        newly_blocked_token = TokenBlocklistModel(jti, now, expiry)
        newly_blocked_token.save_to_db()
        return {"message": "JWT revoked"}, 200


# /user/blocked_tokens/all/admin
class AllBlockedTokens(Resource):
    @swag_from("../swagger_documentation/user-blockedtokens-get-all-admin.yml")
    def get(self):
        all_blocked_tokens = TokenBlocklistModel.get_all_blocked()
        all_blocked_tokens_list = []

        for token in all_blocked_tokens:
            all_blocked_tokens_list.append(token.to_dict())

        return {"blocked_tokens": all_blocked_tokens_list}, 200


# /user/all
class UserAll(Resource):
    @swag_from("../swagger_documentation/user-all.yml")
    def get(self):
        all_users = UserModel.examine_table_contents()
        all_users_list = []

        for user in all_users:
            all_users_list.append(user.convert_details_to_dict())

        return {"all_users": all_users_list}
