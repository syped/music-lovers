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

    album4 = Album(
        user_id=2,
        album_name="THE CHAOS CHAPTER: FIGHT OR ESCAPE",
        release_year=2021,
        album_image="https://images.genius.com/ce9b744e7827f9b996c2997e67eb02d0.787x787x1.jpg"
    )
    db.session.add(album4)

    album5 = Album(
        user_id=3,
        album_name="BURN IT DOWN",
        release_year=2023,
        album_image="https://i1.sndcdn.com/artworks-000491630706-o6935j-t500x500.jpg"
    )
    db.session.add(album5)

    album6 = Album(
        user_id=3,
        album_name="COLLEGE DROPOUT",
        release_year=2004,
        album_image="https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg"
    )
    db.session.add(album6)

    album7 = Album(
        user_id=4,
        album_name="DIMENSION: ANSWER",
        release_year=2022,
        album_image="https://sahiphopza.co/wp-content/uploads/2022/01/album-enhypen-dimension-answer-Mp3-Download.jpg"
    )
    db.session.add(album7)

    album8 = Album(
        user_id=4,
        album_name="WILL YOU BE ALRIGHT",
        release_year=2019,
        album_image="https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/90/aa/90/90aa90f2-4d99-e037-c92d-1728bba3dc26/Will_you_be_alright.jpg/1200x1200bb.jpg"
    )
    db.session.add(album8)

    album9 = Album(
        user_id=5,
        album_name="MAGIC MAN",
        release_year=2022,
        album_image="https://upload.wikimedia.org/wikipedia/en/5/5f/MagicMancover.jpg"
    )
    db.session.add(album9)

    album10 = Album(
        user_id=5,
        album_name="IDENTIFY",
        release_year=2014,
        album_image="https://upload.wikimedia.org/wikipedia/en/2/2e/GOT7_1st_album.jpg"
    )
    db.session.add(album10)

    album11 = Album(
        user_id=1,
        album_name="ANTIFRAGILE",
        release_year=2022,
        album_image="https://sourcemusic.com/resources/discography/cfae49df-6597-465f-b21f-7b7597560ed1.png"
    )
    db.session.add(album11)

    album12 = Album(
        user_id=5,
        album_name="MAD",
        release_year=2015,
        album_image="https://upload.wikimedia.org/wikipedia/en/2/29/Mad_%28Got7_EP%29-cover.jpg"
    )
    db.session.add(album12)

    album13 = Album(
        user_id=4,
        album_name="POSITIVE(EP)",
        release_year=2018,
        album_image="https://upload.wikimedia.org/wikipedia/en/e/ef/Pentagon_-_Positive_%28EP%29.jpg"
    )
    db.session.add(album13)

    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
