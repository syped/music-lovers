from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

from flask_wtf.file import FileRequired, FileAllowed, FileField
from ..api.aws_helpers import ALLOWED_EXTENSIONS

class AlbumForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    album_name = StringField('album_name', validators=[DataRequired(message="This field is required and must be at least 3 characters"), Length(min=3, max=255)])
    release_year = IntegerField('release_year', validators=[DataRequired(message="This field is required and must be an integer")])
    album_image = FileField('album_image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
