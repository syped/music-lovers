from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    playlist1 = Playlist(
        user_id=1,
        playlist_name="Favorites",
        playlist_bio="My favorite songs",
        public=True,
        playlist_image="https://i.kym-cdn.com/entries/icons/facebook/000/022/615/CybuEaUVIAAF_HV.jpg"
    )
    db.session.add(playlist1)

    playlist2 = Playlist(
        user_id=2,
        playlist_name="RoBroken",
        playlist_bio="In my sad boi era",
        public=False,
        playlist_image="https://i.kym-cdn.com/photos/images/newsfeed/002/328/211/810.jpg"
    )
    db.session.add(playlist2)

    playlist3 = Playlist(
        user_id=3,
        playlist_name="Mujahid's Oppas",
        playlist_bio="Mujahid's KoreaBoo playlist",
        public=True,
        playlist_image="https://i.ytimg.com/vi/vAigwiOrl-k/maxresdefault.jpg"
    )
    db.session.add(playlist3)

    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
