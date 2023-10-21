from .db import db, environment, SCHEMA, add_prefix_for_prod

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    release_year = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="album")
    album_image = db.relationship("AlbumImage", back_populates="album")
    song = db.relationship("Song", back_populates="album")

    def to_dict(self):
        return {
            'id': self.id,
            'album_name': self.album_name,
            'user_id': self.user_id,
            'release_year': self.release_year,
        }
