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

    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
