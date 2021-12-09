from db import db

class TokenBlocklistModel(db.Model):

    jwt_id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False)
    created_at = db.Column(db.BigInteger, nullable=False)
    expiry = db.Column(db.BigInteger, nullable=False)

    def __init__(self, jti, created_at, expiry):
        self.jti = jti
        self.created_at = created_at
        self.expiry = expiry

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        item_summary_dict = {
           "jwt_id" : self.jwt_id,
           "jti" : self.jti,
           "created_at" : self.created_at,
           "expiry" : self.expiry
        }
        return item_summary_dict


    @classmethod
    def get_all_blocked(cls):
        all_blocked_jwts = cls.query.all()
        return all_blocked_jwts

    @classmethod
    def get_blocked_jwt(cls, jti_to_check):
        existing_blocked_jwt = cls.query.filter_by(jti=jti_to_check).first()
        return existing_blocked_jwt

    