import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditAlbum from "../EditAlbum";
import DeleteAlbumModal from "../DeleteAlbumModal";
import DeletePlaylistModal from "../DeletePlaylist";
import { getAlbums } from "../../store/album";
import EditPlaylist from "../EditPlaylist";
import { getPlaylistsThunk } from "../../store/playlist";
import { NavLink } from "react-router-dom";
import "./YourLibrary.css";

function YourLibrary() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allAlbumsObj = useSelector((state) => state.albums.allAlbums);
  const allPlaylistObj = useSelector((state) => state.playlists.allPlaylists);

  const albumArr = Object.values(allAlbumsObj);
  const playlistArr = Object.values(allPlaylistObj);

  if (!albumArr || !albumArr.length) {
    dispatch(getAlbums());
    return null;
  }

  if (!playlistArr || !playlistArr.length) {
    dispatch(getPlaylistsThunk());
    return null;
  }

  let userAlbumsArr;

  if (sessionUser) {
    userAlbumsArr = albumArr.filter(
      (album) => album.user_id === sessionUser.id
    );
  }

  let userPlaylistsArr;

  if (sessionUser) {
    userPlaylistsArr = playlistArr.filter(
      (playlist) => playlist.user_id === sessionUser.id
    );
  }

  return (
    <>
      <div className="library-container">
        <h1 className="library-title">Your Library</h1>
        <div className="library-ap-container">
          <div className="library-album-playlists">
            <button className="your-albums">
              <NavLink to="/albums" className="library-album-button">
                Albums
              </NavLink>
            </button>
            <button className="your-playlists">
              <NavLink to="/playlists" className="library-playlist-button">
                Playlists
              </NavLink>
            </button>
          </div>
        </div>
        <div className="user-albums-container">
          {sessionUser &&
            userAlbumsArr.map((album) => (
              <div>
                <div>{album.album_name}</div>
                <div className="album-edit-button">
                  <OpenModalButton
                    buttonText="Edit"
                    modalComponent={<EditAlbum albumId={album.id} />}
                  />
                </div>

                <div className="album-delete-button">
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteAlbumModal albumId={album.id} />}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="user-playlists-container">
          {sessionUser &&
            userPlaylistsArr.map((playlist) => (
              <div className="playlist-edit-delete-container">
                <div>{playlist.playlist_name}</div>
                <div className="playlist-edit-and-delete">
                  <div className="playlist-edit-button">
                    <OpenModalButton
                      buttonText="Edit"
                      modalComponent={<EditPlaylist playlistId={playlist.id} />}
                    />
                  </div>
                  <div className="playlist-delete-button">
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={
                        <DeletePlaylistModal playlistId={playlist.id} />
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default YourLibrary;
