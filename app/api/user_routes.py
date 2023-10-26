from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Like, db

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

# @user_routes.route('/<int:user_id>/like', methods=["POST"])
# @login_required
# def like_playlist(user_id):
#     data = request.get_json()
#     playlist_id = data.get("playlistId")
#     like = Like.query.filter_by(user_id=user_id, playlist_id=playlist_id).first()
    
#     if like:
#         db.session.delete(like)
#         db.session.commit()
#         return jsonify({"liked":False})
#     else:
#         new_like = Like(user_id=user_id, playlist_id=playlist_id)
#         db.session.add(new_like)
#         db.session.commit()
#         return jsonify({"liked":True})