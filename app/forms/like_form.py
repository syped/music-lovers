from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, Length, URL

class LikeForm(FlaskForm):
    playlist_id = IntegerField('playlist_id', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
