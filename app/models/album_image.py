from .db import db, environment, SCHEMA

class AlbumImage(db.Model):
    __tablename__ = 'album_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey("albums.id"))
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"))
    url = db.Column(db.String)

    album = db.relationship("Album", back_populates="album_image")
    song = db.relationship("Song", back_populates="album_image")
    playlist_image = db.relationship("PlaylistImage", back_populates="album_image")

    def to_dict(self):
        return {
            'id': self.id,
            'song_id': self.song_id,
            'album_id': self.album_id,
            'url': self.url,
        }
