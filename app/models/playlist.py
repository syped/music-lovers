from .db import db, environment, SCHEMA, add_prefix_for_prod

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_name = db.Column(db.String(255), nullable=False)
    playlist_image = db.Column(db.String, nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    user = db.relationship("User", back_populates="playlist")
    song = db.relationship("Song", back_populates="playlist")
    like = db.relationship("Like", back_populates="playlist")

    def to_dict(self):
        return {
            'id': self.id,
            'playlist_name': self.playlist_name,
            'playlist_image': self.playlist_image,
            'song_id': self.song_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
