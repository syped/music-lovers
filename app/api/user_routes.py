from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.models import User, Like, db, Playlist
from ..forms.like_form import LikeForm

from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/')
def get_all_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@user_routes.route('/<int:id>/get-likes')
@login_required
def get_likes(id):
    likes = Like.query.filter_by(user_id=id).all()
    return jsonify([like.to_dict() for like in likes])

@user_routes.route('/<int:id>/add-likes', methods=['POST'])
@login_required
def create_like(id):
    print('********')
    form = LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        playlist_id = form.data['playlist_id']
        user_id = form.data['user_id']


        playlist = Playlist.query.get(playlist_id)
        user = User.query.get(user_id)

        if not playlist:
            return {"error": "Playlist not found"}, 404
        if not user:
            return {"error": "User not found"}, 404


        new_like = Like(
            playlist_id=playlist_id,
            user_id=user_id
        )

        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict(), 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
