from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, Length, URL

class PlaylistSongForm(FlaskForm):
    playlist_id = IntegerField('playlist_id', validators=[DataRequired()])
    song_id = IntegerField('song_id', validators=[DataRequired()])
