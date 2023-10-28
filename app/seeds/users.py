from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='blackpink', email='demo@aa.io', password='password', first_name='BLACKPINK', last_name='INYOURAREA')
    robert = User(
        username='robert', email='robert@aa.io', password='password', first_name='Robert', last_name='Ly')
    viv = User(
        username='viv', email='viv@aa.io', password='password', first_name='Viviane', last_name='Le')
    mujahid = User(
        username='mujahid', email='mujahid@aa.io', password='password', first_name='Mujahid', last_name='Ghazal')
    camille = User(
        username='camille', email='camille@aa.io', password='password', first_name='Camille', last_name='Huang')
    

    db.session.add(demo)
    db.session.add(robert)
    db.session.add(viv)
    db.session.add(mujahid)
    db.session.add(camille)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
