from models.blockListModel import TokenBlocklistModel

def purge_expired_jwts_from_blocklist(app):
    app.app_context().push()
    TokenBlocklistModel.purge_expired_jwts()
   


