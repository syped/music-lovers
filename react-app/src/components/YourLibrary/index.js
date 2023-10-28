import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditAlbum from "../EditAlbum";
import DeleteAlbumModal from "../DeleteAlbumModal";
import DeletePlaylistModal from "../DeletePlaylist";
import { getAlbums } from "../../store/album";
import { getPlaylistsThunk } from "../../store/playlist";
import EditPlaylist from "../EditPlaylist";
import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import "./YourLibrary.css";

function YourLibrary({ reload }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allAlbumsObj = useSelector((state) => state.albums.allAlbums);
  const allPlaylistObj = useSelector((state) => state.playlists.allPlaylists);
  const [submitted, setSubmitted] = useState(false);
  const [reloaded, setReloaded] = useState(reload);

  const albumArr = Object.values(allAlbumsObj);
  const playlistArr = Object.values(allPlaylistObj);

  const libraryIcon = process.env.PUBLIC_URL + "/images/LIBRARY.svg";

  const [currAlbum, setCurrAlbum] = useState(true);
  const [currPlaylist, setCurrPlaylist] = useState(false);

  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  useEffect(() => {
    dispatch(getAlbums());

    dispatch(getPlaylistsThunk());
  }, [dispatch]);

  if (!albumArr || !albumArr.length) {
    dispatch(getAlbums());
    return null;
  }

  if (!playlistArr || !playlistArr.length) {
    dispatch(getPlaylistsThunk());
    return null;
  }

  if (reloaded) {
    dispatch(getAlbums());
    dispatch(getPlaylistsThunk());
    setReloaded(false);
  }

  if (submitted) {
    dispatch(getAlbums());
    dispatch(getPlaylistsThunk());
    setSubmitted(false);
  }

  const userAlbumsArr = sessionUser
    ? albumArr.filter((album) => album.user_id === sessionUser.id)
    : [];

  const userPlaylistsArr = sessionUser
    ? playlistArr.filter((playlist) => playlist.user_id === sessionUser.id)
    : [];

  return (
    <>
      <div className="library-container">
        <div className="library-header">
          <img src={libraryIcon} alt="Library" className="library-icon" />
          <span className="library-title">Your Library</span>
        </div>
        <div className="library-ap-container">
          <div className="library-album-playlists">
            <button
              className={`your-albums ${currAlbum ? "active" : ""}`}
              onClick={() => {
                setCurrAlbum(true);
                setCurrPlaylist(false);
              }}
            >
              Albums
            </button>
            <button
              className={`your-playlists ${currPlaylist ? "active" : ""}`}
              onClick={() => {
                setCurrAlbum(false);
                setCurrPlaylist(true);
              }}
            >
              Playlists
            </button>
          </div>
        </div>
        {currAlbum ? (
          <div className="user-albums-container">
            {userAlbumsArr.length > 0 ? (
              userAlbumsArr.map((album) => (
                <div key={album.id} className="user-albums">
                  <div>
                    <img src={album.album_image} className="user-album-cover" />
                  </div>
                  <NavLink to={`/albums/${album.id}`} className="album-title">
                    <div className="user-album-info">
                      <div className="user-album-name">{album.album_name}</div>
                      <div className="album-info-buttons">
                        <div className="album-edit-button">
                          <OpenModalButton
                            className="user-edit-delete-button"
                            buttonText="Edit"
                            modalComponent={
                              <EditAlbum
                                submitted={() => setSubmitted(true)}
                                albumId={album.id}
                              />
                            }
                          />
                        </div>
                        <div className="album-delete-button">
                          <OpenModalButton
                            className="user-edit-delete-button"
                            buttonText="Delete"
                            modalComponent={
                              <DeleteAlbumModal
                                albumId={album.id}
                                submitted={() => setSubmitted(true)}
                              />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="no-content-message">
                {sessionUser ? (
                  <>
                    <div className="library-create-playlist-msg">
                      No album yet ☹
                    </div>
                    <div className="library-create-album-msg">
                      Create your first album
                    </div>
                    <NavLink
                      to="/albums/create"
                      className="library-create-album"
                    >
                      Create Album
                    </NavLink>
                  </>
                ) : (
                  <div className="no-user-msg">
                    <div className="library-login">
                      <div className="library-please">Please</div>
                      <OpenModalButton
                        className="library-login-button"
                        buttonText="Log In"
                        onItemClick={openLoginModal}
                        modalComponent={<LoginFormModal />}
                      />
                    </div>
                    to create an album
                  </div>
                )}
                {isLoginModalOpen && <LoginFormModal />}
              </div>
            )}
          </div>
        ) : null}
        {currPlaylist ? (
          <div className="user-playlists-container">
            {userPlaylistsArr.length > 0 ? (
              userPlaylistsArr.map((playlist) => (
                <div key={playlist.id} className="user-playlists">
                  <div>
                    <img
                      src={playlist.playlist_image}
                      className="user-playlist-cover"
                    />
                  </div>
                  <NavLink
                    to={`/playlists/${playlist.id}`}
                    className="playlist-title"
                  >
                    <div className="user-playlist-info">
                      <div className="user-playlist-name">
                        {playlist.playlist_name}
                      </div>
                      <div className="playlist-info-buttons">
                        <div className="playlist-edit-button">
                          <OpenModalButton
                            className="user-edit-delete-button"
                            buttonText="Edit"
                            modalComponent={
                              <EditPlaylist
                                submitted={() => setSubmitted(true)}
                                playlistId={playlist.id}
                              />
                            }
                          />
                        </div>
                        <div className="playlist-delete-button">
                          <OpenModalButton
                            className="user-edit-delete-button"
                            buttonText="Delete"
                            modalComponent={
                              <DeletePlaylistModal
                                submitted={() => setSubmitted(true)}
                                playlistId={playlist.id}
                              />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="no-content-message">
                {sessionUser ? (
                  <>
                    <div>
                      <div className="library-create-playlist-msg">
                        No playlist yet ☹
                      </div>
                      <div className="library-create-playlist-msg">
                        Create your first playlist
                      </div>
                    </div>
                    <NavLink
                      to="/playlists/create"
                      className="library-create-playlist"
                    >
                      Create Playlist
                    </NavLink>
                  </>
                ) : (
                  <div className="no-user-msg">
                    <div className="library-login">
                      <div className="library-please">Please</div>
                      <OpenModalButton
                        className="library-login-button"
                        buttonText="Log In"
                        onItemClick={openLoginModal}
                        modalComponent={<LoginFormModal />}
                      />
                    </div>
                    to create a playlist
                  </div>
                )}
                {isLoginModalOpen && <LoginFormModal />}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default YourLibrary;
