from .db import db, environment, SCHEMA

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_name = db.Column(db.String(255), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    user = db.relationship("User", back_populates="playlist")
    song = db.relationship("Song", back_populates="playlist")
    playlist_image = db.relationship("PlaylistImage", back_populates="playlist")

    def to_dict(self):
        return {
            'id': self.id,
            'playlist_name': self.playlist_name,
            'song_id': self.song_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
