import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSinglePlaylistThunk,
  getPlaylistSongsThunk,
} from "../../store/playlist";
import { getSongsThunk } from "../../store/song";
import OpenModalButton from "../OpenModalButton";
import AllSongsModal from "../AllSongsModal";

function SinglePlaylistPage() {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const allSongsObj = useSelector((state) => state.songs.allSongs);

  const singlePlaylistObj = useSelector(
    (state) => state.playlists.singlePlaylist
  );
  const playlistSongs = useSelector((state) => state.playlists.playlistSongs);

  const arr = Object.values(allSongsObj);
  const playlistArr = Object.values(playlistSongs);

  useEffect(() => {
    dispatch(getSinglePlaylistThunk(playlistId)).then(() => setIsLoaded(true));
    dispatch(getPlaylistSongsThunk(playlistId));
  }, [dispatch, playlistId]);

  if (!arr || !arr.length) {
    dispatch(getSongsThunk());
    return null;
  }
  //   let userPlaylistSongsArr
  //   let playlistSongsArr

  //     userPlaylistSongsArr = arr.map((song) => {
  //       playlistSongsArr = playlistArr.filter((obj) => obj.song_id === song.id);
  //     });

  let playlistSongsArr = [];

  if (sessionUser) {
    for (let i = 0; i < playlistArr.length; i++) {
      let song = playlistArr[i];
      for (let j = 0; j < arr.length; j++) {
        if (song.song_id === arr[j].id) {
          playlistSongsArr.push(arr[j]);
        }
      }
    }
  }

  console.log("hey", playlistSongsArr);

  //   if (!playlistArr || !playlistArr.length) {
  //     dispatch(getPlaylistSongsThunk(playlistId));
  //     return null;
  //   }

  if (!singlePlaylistObj || !singlePlaylistObj.id) return null;

  return (
    <>
      {isLoaded && (
        <div>
          <div>{singlePlaylistObj.playlist_name}</div>
          {playlistSongsArr.map((song) => (
            <div>{song.song_name}</div>
          ))}
          <div className="song-container">
            <OpenModalButton
              buttonText="Add Song"
              modalComponent={<AllSongsModal playlistId={playlistId} />}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SinglePlaylistPage;
