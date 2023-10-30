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
        album_id=9,
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
        album_id=9,
        song_name="Replay",
        mp3='https://music-lovers-images.s3.amazonaws.com/replay.mp3'
    )
    db.session.add(song8)

    song9 = Song(
        user_id=4,
        album_id=11,
        song_name="Perfect Night",
        mp3='https://music-lovers-images.s3.amazonaws.com/perfect-night.mp3'
    )
    db.session.add(song9)

    song10 = Song(
        user_id=4,
        album_id=7,
        song_name="Polaroid Love",
        mp3='https://music-lovers-images.s3.amazonaws.com/polaroid-love.mp3'
    )
    db.session.add(song10)

    song11 = Song(
        user_id=2,
        album_id=4,
        song_name="LO$ER=LO♡ER",
        mp3='https://music-lovers-images.s3.amazonaws.com/LOSERLOVER.mp3'
    )
    db.session.add(song11)

    song12 = Song(
        user_id=2,
        album_id=4,
        song_name="Anti-Romantic",
        mp3='https://music-lovers-images.s3.amazonaws.com/ANTI-ROMANTIC.mp3'
    )
    db.session.add(song12)

    song13 = Song(
        user_id=4,
        album_id=8,
        song_name="Fiction",
        mp3='https://music-lovers-images.s3.amazonaws.com/fiction.mp3'
    )
    db.session.add(song13)

    song14 = Song(
        user_id=4,
        album_id=8,
        song_name="Beautiful",
        mp3='https://music-lovers-images.s3.amazonaws.com/beautiful.mp3'
    )
    db.session.add(song14)

    song15 = Song(
        user_id=5,
        album_id=9,
        song_name="Movie",
        mp3='https://music-lovers-images.s3.amazonaws.com/movie.mp3'
    )
    db.session.add(song15)

    song16 = Song(
        user_id=5,
        album_id=9,
        song_name="LMLY",
        mp3='https://music-lovers-images.s3.amazonaws.com/lmly.mp3'
    )
    db.session.add(song16)

    song17 = Song(
        user_id=5,
        album_id=10,
        song_name="Magnetic",
        mp3='https://music-lovers-images.s3.amazonaws.com/MAGNETIC.mp3'
    )
    db.session.add(song17)

    song18 = Song(
        user_id=5,
        album_id=10,
        song_name="She's A Monster",
        mp3='https://music-lovers-images.s3.amazonaws.com/shes-a-monster.mp3'
    )
    db.session.add(song18)

    song19 = Song(
        user_id=5,
        album_id=10,
        song_name="Believe",
        mp3='https://music-lovers-images.s3.amazonaws.com/BELIEVE.mp3'
    )
    db.session.add(song19)

    song20 = Song(
        user_id=5,
        album_id=12,
        song_name="If You Do",
        mp3='https://music-lovers-images.s3.amazonaws.com/If+You+Do.mp3'
    )
    db.session.add(song20)

    song21 = Song(
        user_id=5,
        album_id=12,
        song_name="Confession Song",
        mp3='https://music-lovers-images.s3.amazonaws.com/Confession+Song.mp3'
    )
    db.session.add(song21)

    song22 = Song(
        user_id=4,
        album_id=11,
        song_name="Sour Grapes",
        mp3='https://music-lovers-images.s3.amazonaws.com/sour-grapes.mp3'
    )
    db.session.add(song22)

    song23 = Song(
        user_id=4,
        album_id=11,
        song_name="Impurities",
        mp3='https://music-lovers-images.s3.amazonaws.com/impurities.mp3'
    )
    db.session.add(song23)

    song24 = Song(
        user_id=4,
        album_id=11,
        song_name="Good Parts",
        mp3='https://music-lovers-images.s3.amazonaws.com/good-parts.mp3'
    )
    db.session.add(song24)



    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
