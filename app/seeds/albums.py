from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    album1 = Album(
        user_id=1,
        album_name="SQUARE ONE",
        release_year=2016
    )
    db.session.add(album1)

    album2 = Album(
        user_id=1,
        album_name="SQUARE TWO",
        release_year=2016
    )
    db.session.add(album2)

    album3 = Album(
        user_id=2,
        album_name="FLY HIGH PROJECT #2 'ROOFTOP'",
        release_year=2019
    )
    db.session.add(album3)

    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
