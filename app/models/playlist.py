from .db import db, environment, SCHEMA, add_prefix_for_prod

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlist_name = db.Column(db.String(255), nullable=False)
    playlist_bio = db.Column(db.String(999), nullable=True)
    playlist_image = db.Column(db.String, nullable=False)
    # song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # public = db.Column(db.Boolean(True), nullable=False)
    # created_at = db.Column(db.Date)
    # updated_at = db.Column(db.Date)

    user = db.relationship("User", back_populates="playlist")
    # song = db.relationship("Song", back_populates="playlist")

    def to_dict(self):
        return {
            'id': self.id,
            'playlist_name': self.playlist_name,
            'playlist_bio': self.playlist_bio,
            'playlist_image': self.playlist_image,
            # 'song_id': self.song_id,
            'user_id': self.user_id,
            # 'public': self.public
            # 'created_at': self.created_at,
            # 'updated_at': self.updated_at,
        }
