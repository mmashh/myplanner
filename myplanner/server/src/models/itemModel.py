from db import db

import enum


class ItemTypeEnum(enum.Enum):
    note = "NOTE"
    task = "TASK"


# Need to use because JSON true and false and python true and false are
# not compatible. Therefore must use specific strings
class BooleanEnum(enum.Enum):
    true = "TRUE"
    false = "FALSE"


class ItemModel(db.Model):

    __tablename__ = "items"

    item_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    body = db.Column(db.String(512))
    date_created = db.Column(db.String(80))
    item_type = db.Column(db.String(80))
    is_complete = db.Column(db.String(10))
    created_by = db.Column(db.Integer)

    def __init__(self, title, body, date_created, item_type, is_complete, created_by):
        self.title = title
        self.body = body
        self.date_created = date_created
        self.item_type = item_type
        self.is_complete = is_complete
        self.created_by = created_by

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def convert_details_to_dict(self):
        item_summary_dict = {
            "item_id": self.item_id,
            "title": self.title,
            "body": self.body,
            "date_created": self.date_created,
            "item_type": self.item_type,
            "is_complete": self.is_complete,
            "created_by": self.created_by,
        }
        return item_summary_dict

    @classmethod
    def get_all_items(cls):
        all_items = cls.query.all()
        return all_items

    @classmethod
    def get_all_items_created_by_specific_user(cls, id):
        all_items_that_belong_to_this_user = cls.query.filter_by(created_by=id).all()
        return all_items_that_belong_to_this_user

    @classmethod
    def delete_all_items(cls):
        all_items = cls.query.all()
        for item in all_items:
            item.delete_from_db()

    @classmethod
    def find_by_id(cls, item_id):
        return cls.query.filter_by(item_id=item_id).first()
