from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song(
        user_id=1,
        album_id=1,
        song_name="Whistle",
        length=3.31,
        mp3='random1'
    )
    db.session.add(song1)

    song2 = Song(
        user_id=1,
        album_id=1,
        song_name="Boombayah",
        length=4.00,
        mp3='random2'
    )
    db.session.add(song2)

    song3 = Song(
        user_id=1,
        album_id=2,
        song_name="Playing With Fire",
        length=3.17,
        mp3='random3'
    )
    db.session.add(song3)

    song4 = Song(
        user_id=1,
        album_id=2,
        song_name="Stay",
        length=3.50,
        mp3='random4'
    )
    db.session.add(song4)

    song5 = Song(
        user_id=1,
        album_id=2,
        song_name="Whistle (Acoustic Ver.)",
        length=3.52,
        mp3='random5'
    )
    db.session.add(song5)

    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
