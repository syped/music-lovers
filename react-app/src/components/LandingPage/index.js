// import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import { getUsersThunk } from "../../store/session";
import { getRandomAlbum } from "../../store/album";
import { getPlaylistsThunk } from "../../store/playlist";
import "./LandingPage.css";

function LandingPage() {
  // const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const newUser = useSelector((state) => state.session.allUsers);
  const randomAlbumObj = useSelector((state) => state.albums.randomAlbum);
  let playlists = useSelector((state) => state.playlists.allPlaylists);

  console.log("AHAHAHAHAHAHA", randomAlbumObj);

  const albumArr = Object.values(randomAlbumObj);

  useEffect(() => {
    dispatch(getPlaylistsThunk());
  }, [dispatch]);

  if (!albumArr || !albumArr.length) {
    dispatch(getRandomAlbum());
    return null;
  }

  let arr = [];

  if (!playlists) {
    console.log(playlists);
    return null;
  }

  if (playlists) {
    for (let i = 0; i < 6; i++) {
      arr.push(playlists[i]);
    }
    // arr = playlists.slice(0, 7);
  }

  // const albumUser = randomAlbumObj.user_id;

  // if (!newUser) {
  //   dispatch(getUsersThunk());
  //   console.log("JUJUJUJUJUJUUJ", newUser);
  // }

  return (
    <div className="landing-page-container">
      <div className="landing-header">
        {user ? (
          <h1>{`Hi, ${user?.first_name}`} </h1>
        ) : (
          <h1>Hi, Music Lover</h1>
        )}
      </div>
      <div className="landing-page-main">
        <div className="random-album">
          <h2 className="random-album-header">Check this album out!</h2>
          <div className="entire-random-album">
            <NavLink
              className="random-album-navlink"
              to={`/albums/${randomAlbumObj.user_id}`}
            >
              <div className="random-album-div">
                <img
                  className="random-album-img"
                  src={randomAlbumObj.album_image}
                  alt={randomAlbumObj.album_name}
                />
                {/* <div className="random-album-artist">{artist}</div>*/}
                <div className="random-album-info">
                  <div className="random-info-info">
                    <div className="random-album-title">
                      {randomAlbumObj.album_name}
                    </div>
                    <div className="random-album-release-year">
                      {randomAlbumObj.release_year}
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="recent-playlists">
          <div className="recent-playlist-header">
            <h2 className="recent-playlists-title">Popular Playlists</h2>
            <NavLink className="recent-playlist-show-all" to={"/playlists/"}>
              Show All
            </NavLink>
          </div>

          <div className="all-recent-playlists">
            {arr.map((playlist) => (
              <div className="recent-playlist-card">
                <NavLink
                  className="recent-playlist-navlink"
                  to={`/playlists/${playlist?.id}`}
                >
                  <div className="recent-playlist-content">
                    <img
                      className="recent-playlist-image"
                      src={playlist?.playlist_image}
                      alt={playlist?.playlist_name}
                    />
                    <div className="recent-playlist-name">
                      {playlist?.playlist_name}
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
