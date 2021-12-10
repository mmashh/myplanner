import time
from models.blockListModel import TokenBlocklistModel

def test_scheduler(app):
    
    app.app_context().push()
    TokenBlocklistModel.purge_blocked_expired_jwts()
    print("TEST")
    print(time.time())


