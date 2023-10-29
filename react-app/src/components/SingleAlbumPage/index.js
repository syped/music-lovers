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

  useEffect(() => {
    dispatch(getSingleAlbum(albumId)).then(() => setIsLoaded(true));
    dispatch(getSongsThunk());
  }, [dispatch, albumId]);

  if (submitted) {
    dispatch(getSingleAlbum(singleAlbumObj.id));
    setSubmitted(false);
  }

  // if (!arr || !arr.length) {
  //   dispatch(getSongsThunk());
  //   return null;
  // }

  //   if (singleAlbumObj.id !== parseInt(albumId)) return null;

  let albumsSongsArr;

  if (singleAlbumObj) {
    albumsSongsArr = arr.filter((song) => song.album_id === singleAlbumObj.id);
  }

  return (
    <div className="single-album-container">
      {isLoaded && (
        <div>
          <img src={singleAlbumObj?.album_image} />
          <div>{singleAlbumObj?.album_name}</div>
          <div>{singleAlbumObj?.release_year}</div>
          <div>
            {albumsSongsArr?.map((song) => (
              <div key={song.id}>
                <>
                  <div
                    onClick={() => {
                      selectedSong(song.mp3);
                      selectedList(albumsSongsArr);
                    }}
                  >
                    {song.song_name}
                  </div>
                  {sessionUser && sessionUser.id === singleAlbumObj.user_id ? (
                    <div className="song-edit-delete-container">
                      <div className="song-edit">
                        <OpenModalButton
                          buttonText="Edit"
                          modalComponent={
                            <EditSong albumId={albumId} song={song} />
                          }
                        />
                      </div>
                      <div className="song-delete">
                        <OpenModalButton
                          buttonText="Delete"
                          modalComponent={<DeleteSong song={song} />}
                        />
                      </div>
                    </div>
                  ) : null}
                </>
              </div>
            ))}
          </div>
          {singleAlbumObj?.id ? (
            <div>
              <CreateSong submitted={() => setSubmitted(true)} />
              {/* <AudioPlayer src={selectedSong} volume={0.1} /> */}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SingleAlbumPage;
