from sqlalchemy.orm import column_property
from db import db


class EventModel(db.Model):
    __tablename__ = "events"

    event_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    body = db.Column(db.String(280), nullable=True)
    datetime = db.Column(db.DateTime(), nullable=True)
    created_by = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(80), nullable=False)

    def __init__(self, title, body, owner, color):
        self.title = title
        self.body = body
        self.created_by = owner
        self.color = color

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def update_db(self):
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        res = {
            "event_id": self.event_id,
            "title": self.title,
            "body": self.body,
        }

        if self.datetime:
            res["datetime"] = self.datetime.strftime("%d/%m/%Y %H:%M")

        return res

    @classmethod
    def get_all_where(cls, _conditions):
        return cls.query.filter(*_conditions).all()

    @classmethod
    def find_by_id(cls, _ids):
        return cls.query.filter_by(**_ids).first()
