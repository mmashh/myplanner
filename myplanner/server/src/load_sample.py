from datetime import datetime


from db import db
from models.userModel import UserModel
from models.itemModel import ItemModel
from models.eventModel import EventModel


def load():
    sample_records = [
        UserModel("user1234", "user1234"),
        UserModel("user5678", "user5678"),
        ItemModel("Demo-note", "sample text", "23/11/2021 19:01", "NOTE", None, 1),
        ItemModel("Demo-note", "sample text", "23/11/2021 19:01", "NOTE", None, 2),
        ItemModel("Demo-task", "sample text", "23/11/2021 19:02", "TASK", "TRUE", 2),
        EventModel("Quiz x", "Quiz for course xyz", 1, datetime.strptime("14/12/2021 13:30", r"%d/%m/%Y %H:%M")),
        EventModel("Quiz y", None, 2),
    ]
    
    db.session.bulk_save_objects(sample_records)
    db.session.commit()
