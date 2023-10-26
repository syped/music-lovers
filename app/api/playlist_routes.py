from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Playlist, PlaylistSong, Song, db, Like, User
from app.forms.playlist_form import PlaylistForm
from app.forms.like_form import LikeForm
from app.forms.playlist_song_form import PlaylistSongForm
from .auth_routes import validation_errors_to_error_messages

from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

playlist_routes = Blueprint('playlists', __name__)

#GET ALL PLAYLISTS
@playlist_routes.route('/')
def get_all_playlists():
    playlists = Playlist.query.all()
    return jsonify([playlist.to_dict() for playlist in playlists])
    # user_id = request.args.get('userId')

    # if user_id:
    #     playlists = Playlist.query.filter(
    #         (Playlist.owner_id == user_id, Playlist.is_public == False),
    #         Playlist.is_public == True
    #     ).all()
    # else:
    #     playlists = Playlist.query.filter(Playlist.is_public == True).all()

    # return jsonify([playlist.to_dict() for playlist in playlists])

#GET SINGLE PLAYLIST
@playlist_routes.route('/<int:id>')
def get_single_playlist(id):
    playlist = Playlist.query.get(id)
    if playlist:
        return playlist.to_dict()
    else:
        return {"error": "Playlist not found"}, 404

#CREATE A PLAYLIST
@playlist_routes.route('/create_playlist', methods=['POST'])
@login_required
def create_playlist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        playlist_image = form.data['playlist_image']
        playlist_image.filename = get_unique_filename(playlist_image.filename)
        upload = upload_file_to_s3(playlist_image)

        if 'url' not in upload:
            return {'errors': [upload]}

        new_playlist = Playlist(
            playlist_name = form.data['playlist_name'],
            # song_id = form.data['song_id'],
            user_id = form.data['user_id'],
            playlist_image = upload['url'],
            playlist_bio = form.data['playlist_bio'],
            # created_at = form.data['created_at']
            # updated_at = form.data['updated_at']
        )
        db.session.add(new_playlist)
        db.session.commit()
        return new_playlist.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#EDIT PLAYLIST
@playlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_playlist(id):
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        playlist = Playlist.query.get(id)
        playlist.playlist_name = form.data['playlist_name']
        playlist.playlist_bio = form.data['playlist_bio']

        db.session.commit()
        return playlist.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#DELETE PLAYLIST
@playlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_playlist(id):
    playlist = Playlist.query.get(id)
    if playlist:
        db.session.delete(playlist)
        db.session.commit()
        return "Playlist successfully deleted."
    else:
        return {'error': 'Playlist does not exist'}, 404

#ADD SONG TO PLAYLIST
# @playlist_routes.route('/<int:id>/add-song', methods=['POST'])
# @login_required
# def create_playlist_song():
#     form = PlaylistSongForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         new_playlist_song = PlaylistSong(
#              playlist_id=form.data['playlist_id'],
#              song_id=form.data['song_id']
#              )
#         db.session.add(new_playlist_song)
#         db.session.commit()
#         return new_playlist_song.to_dict()
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    # playlist = Playlist.query.get(playlist_id)
    # if playlist:
    #     song_id = request.form.get("song_id")
    #     song = Song.query.get(song_id)
    #     playlist.songs.append(song)
    #     db.session.commit()
    #     return playlist.to_dict()
    # else:
    #     return {'errors': "Relationship Failed Song to Playlist"}, 400

@playlist_routes.route('/<int:id>/get-songs')
@login_required
def get_playlist_songs(id):
    songs = PlaylistSong.query.filter_by(playlist_id=id).all()
    return jsonify([song.to_dict() for song in songs])

@playlist_routes.route('/<int:id>/add-song', methods=['POST'])
@login_required
def create_playlist_song(id):
    form = PlaylistSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        playlist_id = form.data['playlist_id']
        song_id = form.data['song_id']


        playlist = Playlist.query.get(playlist_id)
        song = Song.query.get(song_id)

        if not playlist:
            return {"error": "Playlist not found"}, 404
        if not song:
            return {"error": "Song not found"}, 404


        new_playlist_song = PlaylistSong(
            playlist_id=playlist_id,
            song_id=song_id
        )

        db.session.add(new_playlist_song)
        db.session.commit()
        return new_playlist_song.to_dict(), 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# @playlist_routes.route('/<int:id>/get-likes')
# @login_required
# def get_likes(id):
#     likes = Like.query.filter_by(playlist_id=id).all()
#     return jsonify([like.to_dict() for like in likes])

# @playlist_routes.route('/<int:id>/edit-likes', methods=['PUT'])
# @login_required
# def edit_likes(id):
#     form = LikeForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         like = Like.query.get()
#         like.playlist_id = form.data['playlist_id']
#         like.user_id = form.data['user_id']
#         like.liked = form.data['liked']

#         db.session.commit()
#         return like.to_dict()
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# @playlist_routes.route('/<int:playlist_id>/edit-likes', methods=['PUT'])
# @login_required
# def edit_likes(playlist_id):
#     playlist = Playlist.query.get(playlist_id)

#     if not playlist:
#         return jsonify({'error': 'Playlist not found'}), 404

#     user_id = current_user.id
#     like = Like.query.filter_by(user_id=user_id, playlist_id=playlist_id).first()

#     if like:
#         db.session.delete(like)
#         db.session.commit()
#         return jsonify({'liked': False})
#     else:
#         new_like = Like(user_id=user_id, playlist_id=playlist_id)
#         db.session.add(new_like)
#         db.session.commit()
#         return jsonify({'liked': True})

@playlist_routes.route('/<int:id>/get-likes')
@login_required
def get_likes(id):
    likes = Like.query.filter_by(user_id=id).all()
    return jsonify([like.to_dict() for like in likes])

@playlist_routes.route('/<int:id>/add-likes', methods=['POST'])
@login_required
def create_like(id):
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
