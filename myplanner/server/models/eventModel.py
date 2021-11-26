from db import db


class EventModel(db.Model):
    __tablename__ = "events"

    event_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    body = db.Column(db.String(280), nullable=True)
    date = db.Column(db.DateTime(), nullable=True)

    def __init__(self, title, body):
        self.title = title
        self.body = body

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
            res = {
                "event_id": self.event_id,
                "title": self.title,
                "body": self.body,
                "date": self.date.strftime("%d/%m/%Y %H:%M"),
            }

        return res

    @classmethod
    def get_all_items(cls):
        all_items = cls.query.all()
        return all_items

    @classmethod
    def delete_all_items(cls):
        all_items = cls.query.all()
        for item in all_items:
            item.delete_from_db()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(event_id=_id).first()
