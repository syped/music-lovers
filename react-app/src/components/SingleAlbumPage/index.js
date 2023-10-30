import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleAlbum } from "../../store/album";
import OpenModalButton from "../OpenModalButton";
import { getSongsThunk } from "../../store/song";
import EditSong from "../EditSong";
import DeleteSong from "../DeleteSong";
import CreateSong from "../CreateSong";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function SingleAlbumPage({ selectedSong, selectedList }) {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const allSongsObj = useSelector((state) => state.songs.allSongs);
  // const [selectedSong, setSelectedSong] = useState();
  const [submitted, setSubmitted] = useState(false);

  const singleAlbumObj = useSelector((state) => state.albums.singleAlbum);

  const arr = Object.values(allSongsObj);

  const playIcon = process.env.PUBLIC_URL + "/images/PLAY.svg";

  useEffect(() => {
    dispatch(getSingleAlbum(albumId));
    setIsLoaded(true);
    dispatch(getSongsThunk());
  }, [dispatch, albumId]);

  if (submitted) {
    dispatch(getSingleAlbum(singleAlbumObj.id));
    dispatch(getSongsThunk());
    setSubmitted(false);
  }

  if (!singleAlbumObj) {
    return <Redirect to="/" />;
  }

  // if (!arr || !arr.length) {
  //   dispatch(getSongsThunk());
  //   return null;
  // }

  //   if (singleAlbumObj.id !== parseInt(albumId)) return null;

  let albumsSongsArr;
  let count;

  if (singleAlbumObj) {
    albumsSongsArr = arr.filter((song) => song.album_id === singleAlbumObj.id);
    if (albumsSongsArr.length === 1)
      count = count = `${albumsSongsArr.length} song`;
    else if (albumsSongsArr.length > 1)
      count = `${albumsSongsArr.length} songs`;
    else {
      count = "New";
    }
  }

  const handleClick = (id) => {
    for (let i = 0; i < albumsSongsArr.length; i++) {
      if (id === albumsSongsArr[i].id) {
        console.log("first", i);
        selectedSong(i);
      }
    }
  };

  return (
    <>
      {isLoaded && (
        <div className="single-album-container">
          <img
            src={singleAlbumObj?.album_image}
            className="single-album-image"
          />
          <div className="single-album-name">{singleAlbumObj?.album_name}</div>
          <div className="single-album-year">
            {singleAlbumObj?.release_year}
          </div>
          <div className="single-album-count"> · {count}</div>
          <div className="single-album-add-song">
            {sessionUser &&
            singleAlbumObj?.id &&
            sessionUser.id === singleAlbumObj.user_id ? (
              <div className="add-song-button">
                <OpenModalButton
                  buttonText="Add Song"
                  modalComponent={
                    <CreateSong
                      albumId={albumId}
                      submitted={() => setSubmitted(true)}
                    />
                  }
                />
              </div>
            ) : null}
          </div>
          <h3 className="single-album-header">Title</h3>
          <div className="underline"></div>
          <div className="single-album-song-container">
            {albumsSongsArr?.map((song) => (
              <div className="single-album-song" key={song.id}>
                <>
                  {sessionUser ? (
                    <img
                      onClick={() => {
                        handleClick(song.id);
                        selectedList(albumsSongsArr);
                      }}
                      className="song-play"
                      src={playIcon}
                    />
                  ) : (
                    <img
                      onClick={() => {
                        handleClick(song.id);
                        selectedList(albumsSongsArr);
                      }}
                      className="song-play no-session-user-play"
                      src={playIcon}
                    />
                  )}
                  <div>{song.song_name}</div>
                  {sessionUser && sessionUser.id === singleAlbumObj.user_id ? (
                    <div className="song-edit-delete-container">
                      <div className="song-edit">
                        <OpenModalButton
                          buttonText="Edit"
                          modalComponent={
                            <EditSong
                              albumId={albumId}
                              song={song}
                              submitted={() => setSubmitted(true)}
                            />
                          }
                        />
                      </div>
                      <div className="song-delete">
                        <OpenModalButton
                          buttonText="Delete"
                          modalComponent={
                            <DeleteSong
                              song={song}
                              submitted={() => setSubmitted(true)}
                            />
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                </>
              </div>
            ))}
          </div>
          <div className="single-album-song-background"></div>
        </div>
      )}
    </>
  );
}

export default SingleAlbumPage;
