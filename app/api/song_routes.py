from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.models import Song, db
from app.forms.song_form import SongForm
from .auth_routes import validation_errors_to_error_messages

song_routes = Blueprint('songs', __name__)

#GET ALL SONGS
@song_routes.route('/')
def get_all_songs():
    songs = Song.query.all()
    return jsonify(song.to_dict() for song in songs)

#GET SINGLE SONG
@song_routes.route('/<int:id>')
def get_single_song(id):
    song = Song.query.get(id)
    if song:
        return song.to_dict()
    else:
        return {"error": "Song not found"}, 404

#CREATE A SONG
@song_routes.route('/create_song', methods=['POST'])
@login_required
def create_album():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_song = Song(
            user_id = form.data['user_id'],
            album_id = form.data['album_id'],
            song_name = form.data['song_name'],
            length = form.data['length'],
            mp3 = form.data['mp3'] #!! GO BACKKKKKKK
        )
        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#EDIT SONG
@song_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_song(id):
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        song = Song.query.get(id)
        song.album_id = form.data['album_id']
        song.song_name = form.data['song_name']

        db.session.commit()
        return song.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    
#DELETE SONG
@song_routes.route('/int:id>', methods=['DELETE'])
@login_required
def delete_song(id):
    song = Song.query.get(id)
    if song:
        db.session.delete(song)
        db.session.commit()
        return "Song successfully deleted."
    else:
        return {'error': 'Song does not exist'}, 404