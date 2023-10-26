from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class PlaylistLikedForm(FlaskForm):
    playlist_id = IntegerField('playlist_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    liked = IntegerField('liked', validators=[DataRequired()])
