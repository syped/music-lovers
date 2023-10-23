from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required
from app.models import Album, db
from app.forms.album_form import AlbumForm
from .auth_routes import validation_errors_to_error_messages

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

#CREATE AN ALBUM
@album_routes.route('/', methods=['POST'])
@login_required
def create_album():
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_album = Album(
            album_name = form.data['album_name'],
            release_year = form.data['release_year']
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
    form = AlbumForm() #CREATE A NEW FORM FOR EDIT ALBUM?
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
    if album:
        db.session.delete(album)
        db.session.commit()
        return "Album successfully deleted."
    else:
        return {'error': 'Album does not exist'}, 404
