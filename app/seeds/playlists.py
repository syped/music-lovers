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
        user_id=1,
        playlist_name="Workout",
        playlist_bio="Gotta go hard in the gym",
        playlist_image="https://t4.ftcdn.net/jpg/05/93/47/83/360_F_593478313_kQRMafnEEtZXSVMOUpKdD7QDVPJSKn4Q.jpg"
    )
    db.session.add(playlist4)

    playlist5 = Playlist(
        user_id=2,
        playlist_name="LAZY",
        playlist_bio="Lazy playlist",
        playlist_image="https://merriam-webster.com/assets/mw/images/gallery/gal-wap-slideshow-slide/cat%20sleeping%20upside%20down%20on%20sofa-10261-3e791c20d759a5cc1f6137451820b10a@1x.jpg"
    )
    db.session.add(playlist5)

    playlist6 = Playlist(
        user_id=4,
        playlist_name="Vibes",
        playlist_bio="The vibey playlist",
        playlist_image="https://media.self.com/photos/63a1eb6b0248395e19a5ede7/3:2/w_1800,h_1200,c_limit/Self%20Playlist%20flattened.jpg"
    )
    db.session.add(playlist6)

    playlist7 = Playlist(
        user_id=3,
        playlist_name="Car BOPS",
        playlist_bio="The car playlist",
        playlist_image="https://as2.ftcdn.net/v2/jpg/05/72/67/79/1000_F_572677902_81yN2FWPAobXTgfGc4HH3M0QcjAthPGm.jpg"
    )
    db.session.add(playlist7)

    playlist8 = Playlist(
        user_id=1,
        playlist_name="Plane BOPS",
        playlist_bio="The plane playlist",
        playlist_image="https://wallpapers.com/images/featured/plane-desktop-background-dnc62a0eoyniwrfl.jpg"
    )
    db.session.add(playlist8)

    playlist9 = Playlist(
        user_id=5,
        playlist_name="Just Chill",
        playlist_bio="CHILL playlist",
        playlist_image="https://i.pinimg.com/1200x/11/17/57/111757ad3dc8123c12f263ecc003b009.jpg"
    )
    db.session.add(playlist9)

    playlist10 = Playlist(
        user_id=2,
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
