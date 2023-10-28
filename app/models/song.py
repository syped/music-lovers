from .db import db, environment, SCHEMA, add_prefix_for_prod

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_name = db.Column(db.String(255), nullable=False)
    mp3 = db.Column(db.String)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="song")
    album = db.relationship("Album", back_populates="song")
    playlist_song = db.relationship("PlaylistSong", back_populates="song")

    def to_dict(self):
        return {
            'id': self.id,
            'song_name': self.song_name,
            'mp3': self.mp3,
            'album_id': self.album_id,
            'user_id': self.user_id,
        }
