from .db import db, environment, SCHEMA

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_name = db.Column(db.String(255), nullable=False)
    length = db.Column(db.Float)
    mp3 = db.Column(db.String, nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey("albums.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="song")
    album = db.relationship("Album", back_populates="song")
    playlist = db.relationship("Playlist", back_populates="song")
    like = db.relationship("Like", back_populates="song")
    album_image = db.relationship("AlbumImage", back_populates="song")

    def to_dict(self):
        return {
            'id': self.id,
            'song_name': self.song_name,
            'length': self.length,
            'mp3': self.mp3,
            'album_id': self.album_id,
            'user_id': self.user_id,
        }
