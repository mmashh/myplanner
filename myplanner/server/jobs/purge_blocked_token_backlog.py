import time
from models.blockListModel import TokenBlocklistModel

def test_scheduler(app):
    app.app_context().push()
    TokenBlocklistModel.purge_expired_jwts()
   


