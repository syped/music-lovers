from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    playlist1 = Playlist(
        user_id=1,
        playlist_name="Favorites",
        playlist_bio="My favorite bops and chops",
        playlist_image="https://i.kym-cdn.com/entries/icons/facebook/000/022/615/CybuEaUVIAAF_HV.jpg"
    )
    db.session.add(playlist1)

    playlist2 = Playlist(
        user_id=2,
        playlist_name="RoBroken",
        playlist_bio="In my sad boi era",
        playlist_image="https://i.kym-cdn.com/photos/images/newsfeed/002/328/211/810.jpg"
    )
    db.session.add(playlist2)

    playlist3 = Playlist(
        user_id=3,
        playlist_name="Mujahid's Oppas",
        playlist_bio="Mujahid's KoreaBoo playlist",
        playlist_image="https://i.ytimg.com/vi/vAigwiOrl-k/maxresdefault.jpg"
    )
    db.session.add(playlist3)

    playlist4 = Playlist(
        user_id=4,
        playlist_name="I LOVE HEESEUNG",
        playlist_bio="I'll fight Duolingo for him",
        playlist_image="https://media.tenor.com/-WnrzSiaZFQAAAAC/heeseung-enhypen-heeseung.gif"
    )
    db.session.add(playlist4)

    playlist5 = Playlist(
        user_id=3,
        playlist_name="song so good it hurts",
        playlist_bio="i want to scream these songs",
        playlist_image="https://i.pinimg.com/originals/f9/df/72/f9df723718728725f8abac9d759d79b2.jpg"
    )
    db.session.add(playlist5)

    playlist6 = Playlist(
        user_id=4,
        playlist_name="vibey wifey",
        playlist_bio="dun DUNCE DUNC UDNDUDN UNDUN",
        playlist_image="https://media.tenor.com/mljLgH4Csu0AAAAd/cat-cat-vibing.gif"
    )
    db.session.add(playlist6)

    playlist7 = Playlist(
        user_id=2,
        playlist_name="car boopy poopy",
        playlist_bio="vroom vroom skrt skrt",
        playlist_image="https://i.pinimg.com/originals/18/a5/9b/18a59b1e065ceca2990ee979bd5efc50.jpg"
    )
    db.session.add(playlist7)

    playlist8 = Playlist(
        user_id=5,
        playlist_name="songs to get me through coding",
        playlist_bio="so I stay ✨sane✨",
        playlist_image="https://pbs.twimg.com/media/FBsg0xhWYAQV4JA.jpg"
    )
    db.session.add(playlist8)

    playlist9 = Playlist(
        user_id=3,
        playlist_name="Just Chill",
        playlist_bio="CHILL playlist",
        playlist_image="https://i.pinimg.com/1200x/11/17/57/111757ad3dc8123c12f263ecc003b009.jpg"
    )
    db.session.add(playlist9)

    playlist10 = Playlist(
        user_id=3,
        playlist_name="EDM",
        playlist_bio="EDM playlist",
        playlist_image="https://wallpapers.com/images/hd/edm-14h8pl0glbsyokmz.jpg"
    )
    db.session.add(playlist10)

    playlist11 = Playlist(
        user_id=5,
        playlist_name="Simpy Pimpy",
        playlist_bio="got my kokoro going bADUMP BADUMP",
        playlist_image="https://i.imgflip.com/7dafgs.png"
    )
    db.session.add(playlist11)

    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
