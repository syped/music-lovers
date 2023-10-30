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
        album_name="THE WAY IT WAS",
        release_year=2011,
        album_image="https://i.imgur.com/WhaBXBw.jpg"
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
        album_name="CHEMISTRY",
        release_year=2023,
        album_image="https://m.media-amazon.com/images/I/718rCS-3K0L._UF1000,1000_QL80_.jpg"
    )
    db.session.add(album7)

    album8 = Album(
        user_id=4,
        album_name="WHEN WE ALL FALL ASLEEP WHERE DO WE GO",
        release_year=2019,
        album_image="https://www.udiscovermusic.com/wp-content/uploads/2015/10/Billie-Eilish-When-We-All-Fall-Asleep-Where-Do-We-Go.jpg"
    )
    db.session.add(album8)

    album9 = Album(
        user_id=2,
        album_name="ABBEY ROAD",
        release_year=1969,
        album_image="https://www.udiscovermusic.com/wp-content/uploads/2015/10/The-Beatles-Abbey-Road-Album-cover-web-optimised-820.jpg"
    )
    db.session.add(album9)

    album10 = Album(
        user_id=5,
        album_name="1989",
        release_year=2014,
        album_image="https://www.udiscovermusic.com/wp-content/uploads/2015/10/Taylor-Swift-1989.jpg"
    )
    db.session.add(album10)

    album11 = Album(
        user_id=1,
        album_name="NATIVE",
        release_year=2013,
        album_image="https://m.media-amazon.com/images/I/71YyUE+g4oS._UF1000,1000_QL80_.jpg"
    )
    db.session.add(album11)

    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
