from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length

from flask_wtf.file import FileRequired, FileAllowed, FileField
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class PlaylistForm(FlaskForm):
    playlist_name = StringField('playlist_name', validators=[DataRequired(message="This field is required and must be at least 3 characters long"), Length(min=3, max=255)])
    # song_id = IntegerField('song_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    playlist_image = FileField('playlist_image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    playlist_bio = StringField('playlist_bio', validators=[DataRequired()])
    # created_at = DateField('created_at')
    # updated_at = DateField('updated_at')
