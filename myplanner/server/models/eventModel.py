from db import db


class EventModel(db.Model):
    __tablename__ = "events"

    event_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    body = db.Column(db.String(280), nullable=True)
    date = db.Column(db.DateTime(), nullable=True)
    owner = db.Column(db.Integer, nullable=False)

    def __init__(self, title, body, owner):
        self.title = title
        self.body = body
        self.owner = owner

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

        if self.date:
            res["date"] = self.date.strftime("%d/%m/%Y %H:%M")

        return res

    @classmethod
    def get_all_where(cls, _conditions):
        return cls.query.filter(*_conditions).all()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(event_id=_id).first()
