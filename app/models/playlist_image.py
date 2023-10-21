from .db import db, environment, SCHEMA

class PlaylistImage(db.Model):
    __tablename__ = 'playlist_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey("playlists.id"))
    album_images_id = db.Column(db.Integer, db.ForeignKey("album_images.id"))
    url = db.Column(db.String)

    playlist = db.relationship("Playlist", back_populates="playlist_image")
    album_image = db.relationship("AlbumImage", back_populates="playlist_image")

    def to_dict(self):
        return {
            'id': self.id,
            'playlist_id': self.playlist_id,
            'album_images_id': self.album_images_id,
            'url': self.url,
        }
