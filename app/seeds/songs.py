from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song(
        user_id=1,
        album_id=1,
        song_name="Whistle",
        mp3='https://music-lovers-images.s3.amazonaws.com/%ED%9C%98%ED%8C%8C%EB%9E%8C+(Whistle).mp3'
    )
    db.session.add(song1)

    song2 = Song(
        user_id=1,
        album_id=1,
        song_name="Boombayah",
        mp3='https://music-lovers-images.s3.amazonaws.com/%EB%B6%90%EB%B0%94%EC%95%BC+(Boombayah).mp3'
    )
    db.session.add(song2)

    song3 = Song(
        user_id=1,
        album_id=2,
        song_name="Playing With Fire",
        mp3='https://music-lovers-images.s3.amazonaws.com/%EB%B6%88%EC%9E%A5%EB%82%9C+(Playing+With+Fire).mp3'
    )
    db.session.add(song3)

    song4 = Song(
        user_id=1,
        album_id=2,
        song_name="Stay",
        mp3='https://music-lovers-images.s3.amazonaws.com/Stay.mp3'
    )
    db.session.add(song4)

    song5 = Song(
        user_id=1,
        album_id=2,
        song_name="Whistle (Acoustic Ver.)",
        mp3='https://music-lovers-images.s3.amazonaws.com/%ED%9C%98%ED%8C%8C%EB%9E%8C+(Whistle)+(Acoustic+Version).mp3'
    )
    db.session.add(song5)

    song6 = Song(
        user_id=5,
        album_id=10,
        song_name="That Kind of Love",
        mp3='https://music-lovers-images.s3.amazonaws.com/that-kind-of-love.mp3'
    )
    db.session.add(song6)

    song7 = Song(
        user_id=2,
        album_id=3,
        song_name="Rooftop",
        mp3='https://music-lovers-images.s3.amazonaws.com/rooftop.mp3'
    )
    db.session.add(song7)

    song8 = Song(
        user_id=5,
        album_id=10,
        song_name="Replay",
        mp3='https://music-lovers-images.s3.amazonaws.com/replay.mp3'
    )
    db.session.add(song8)

    song9 = Song(
        user_id=5,
        album_id=10,
        song_name="Perfect Night",
        mp3='https://music-lovers-images.s3.amazonaws.com/perfect-night.mp3'
    )
    db.session.add(song9)

    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
