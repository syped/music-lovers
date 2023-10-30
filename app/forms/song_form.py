from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, Length, URL

from flask_wtf.file import FileRequired, FileAllowed, FileField
from ..api.aws_helpers import ALLOWED_SONG_EXTENSIONS

class SongForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    album_id = IntegerField('album_id', validators=[DataRequired()])
    song_name = StringField('song_name', validators=[DataRequired(message="This field is required and must be at least 3 characters."), Length(min=3, max=255)])
    # length = FloatField('length', validators=[DataRequired(message="This field is required.")])
    # mp3 = StringField('mp3', validators=[DataRequired(message="This field is required and must be a MP3 file.")])
    mp3 = FileField('mp3', validators=[FileAllowed(list(ALLOWED_SONG_EXTENSIONS))])
