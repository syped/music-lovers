from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    album = db.relationship("Album", back_populates="user")
    song = db.relationship("Song", back_populates="user")
    playlist = db.relationship("Playlist", back_populates="user")

    like = db.relationship("Like", back_populates="user")
    # users = db.relationship(
    #                         'User',
    #                         secondary=likes,
    #                         primaryjoin=(likes.c.user_id == id),
    #                         secondaryjoin=(likes.c.playlist_id == id),
    #                         backref=db.backref('liked', lazy='dynamic'),
    #                         lazy='dynamic'
    #                         )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name
        }
