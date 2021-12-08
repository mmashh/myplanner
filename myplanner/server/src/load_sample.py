from datetime import datetime


from db import db
from models.userModel import UserModel
from models.itemModel import ItemModel
from models.eventModel import EventModel
from modules.constants import DATETIME_FORMAT


def load():
    sample_records = [
        UserModel("user1234", "user1234"),
        UserModel("user5678", "user5678"),
        ItemModel("Demo-note", "sample text", "03/12/2021 21:26", "NOTE", None, 1),
        ItemModel("Demo-task", "sample text", "03/12/2021 21:26", "TASK", "TRUE", 2),
        EventModel("Quiz x", "Quiz for course xyz", 1, 'red', datetime.strptime("14/12/2021 13:30", DATETIME_FORMAT)),
        EventModel("Quiz y", None, 2, 'green'),
    ]
    
    db.session.bulk_save_objects(sample_records)
    db.session.commit()
