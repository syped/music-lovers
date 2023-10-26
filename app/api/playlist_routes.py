from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Playlist, PlaylistSong, Song, Like, User, db
from app.forms.playlist_form import PlaylistForm
from app.forms.playlist_song_form import PlaylistSongForm
from app.forms.playlist_liked import PlaylistLikedForm
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

@playlist_routes.route('/<int:id>/liked')
@login_required
def liked_playlist(id):
    form = PlaylistLikedForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        playlist_id = form.data['playlist_id']
        user_id = form.data['user_id']
        liked = form.data['liked']

        playlist = Playlist.query.get(playlist_id)
        user = User.query.get(user_id)

        new_liked_playlist = Like(
            playlist_id = playlist_id,
            user_id = user_id,
            liked = liked
        )

        db.session.add(new_liked_playlist)
        db.session.commit()
        return new_liked_playlist.to_dict(), 201
    else:
        return {'error': validation_errors_to_error_messages(form.errors)}, 400
    