from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    song = db.relationship("Song", back_populates="like")
    user = db.relationship("User", back_populates="like")

    def to_dict(self):
        return {
            'id': self.id,
            'song_id': self.song_id,
            'user_id': self.user_id,
        }
