from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    album1 = Album(
        user_id=1,
        album_name="SQUARE ONE",
        release_year=2016,
        album_image="https://upload.wikimedia.org/wikipedia/en/f/f8/Square_One_-_Blackpink.jpg"
    )
    db.session.add(album1)

    album2 = Album(
        user_id=1,
        album_name="SQUARE TWO",
        release_year=2016,
        album_image="https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Square_Two_-_Blackpink.jpg/220px-Square_Two_-_Blackpink.jpg"
    )
    db.session.add(album2)

    album3 = Album(
        user_id=2,
        album_name="FLY HIGH PROJECT #2 'ROOFTOP'",
        release_year=2019,
        album_image="https://m.media-amazon.com/images/I/41frYoGm88L._UXNaN_FMjpg_QL85_.jpg"
    )
    db.session.add(album3)

    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
