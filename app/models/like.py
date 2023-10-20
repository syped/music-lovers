from .db import db, environment, SCHEMA

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    song = db.relationship("Song", back_populates="likes")
    users = db.relationship("User", back_populates="likes")

    def to_dict(self):
        return {
            'id': self.id,
            'song_id': self.song_id,
            'user_id': self.user_id,
        }