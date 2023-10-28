from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.models import Album, db, User
from app.forms.album_form import AlbumForm
from .auth_routes import validation_errors_to_error_messages
import random

from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

album_routes = Blueprint('albums', __name__)

#GET ALL ALBUMS
@album_routes.route('/')
def get_all_albums():
    albums = Album.query.all()
    return jsonify([album.to_dict() for album in albums])

#GET SINGLE ALBUM
@album_routes.route('/<int:id>')
def get_single_album(id):
    album = Album.query.get(id)
    if album:
        return album.to_dict()
    else:
        return {"error": "Album not found"}, 404
    
#GET RANDOM ALBUM
@album_routes.route('/random', methods=['GET'])
def get_random_album():
    albums = Album.query.all()
    if albums:
        random_album = random.choice(albums)
        return random_album.to_dict()
    else:
        return {"error": "No albums found"}, 404

#CREATE AN ALBUM
@album_routes.route('/create_album', methods=['POST'])
@login_required
def create_album():
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album_image = form.data['album_image']
        album_image.filename = get_unique_filename(album_image.filename)
        upload = upload_file_to_s3(album_image)

        if 'url' not in upload:
            return {'errors': [upload]}

        new_album = Album(
            user_id = form.data['user_id'],
            album_name = form.data['album_name'],
            release_year = form.data['release_year'],
            album_image= upload['url']
        )
        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#EDIT ALBUM
@album_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_album(id):
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        album = Album.query.get(id)
        album.album_name = form.data['album_name']
        album.release_year = form.data['release_year']

        db.session.commit()
        return album.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#DELETE ALBUM
@album_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_album(id):
    album = Album.query.get(id)
    file_to_delete = remove_file_from_s3(album.album_image)

    if file_to_delete:
        db.session.delete(album)
        db.session.commit()
        return "Album successfully deleted."
    else:
        return {'error': 'Album does not exist'}, 404
