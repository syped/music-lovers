from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    playlist = db.relationship("Playlist", back_populates="like")
    user = db.relationship("User", back_populates="like")

    def to_dict(self):
        return {
            'id': self.id,
            'playlist_id': self.playlist_id,
            'user_id': self.user_id,
            # 'liked': self.liked
        }

# likes = db.Table(
#     'likes',
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
#     db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'))
# )
