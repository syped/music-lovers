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
import { FaRegHeart, FaHeart } from "react-icons/fa";
// import { likePlaylist, unlikePlaylist } from "../../store/likes";
import { getUsersThunk, getLikeThunk, likeThunk } from "../../store/session";

function SinglePlaylistPage() {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [numLikes, setNumLikes] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const allSongsObj = useSelector((state) => state.songs.allSongs);
  const likedPlaylists = useSelector((state) => state.session.userLikes);
  const [liked, setLiked] = useState(false);

  const singlePlaylistObj = useSelector(
    (state) => state.playlists.singlePlaylist
  );
  const playlistSongs = useSelector((state) => state.playlists.playlistSongs);

  const arr = Object.values(allSongsObj);
  const playlistArr = Object.values(playlistSongs);

  // let handleLike;

  // useEffect(() => {
  //   if (
  //     likedPlaylists.user_id === sessionUser.id &&
  //     likedPlaylists.playlistId === playlistId
  //   ) {
  //     setLiked("");
  //     handleLike = () => {
  //       dispatch(toggleThunk(playlistId));
  //     };
  //   } else {
  //     setLiked("liked");
  //   }
  // }, [likedPlaylists, playlistId]);

  useEffect(() => {
    dispatch(getSinglePlaylistThunk(playlistId)).then(() => setIsLoaded(true));
    dispatch(getPlaylistSongsThunk(playlistId));
    dispatch(getLikeThunk(playlistId));
    dispatch(getUsersThunk());
  }, [dispatch, playlistId]);

  if (!arr || !arr.length) {
    dispatch(getSongsThunk());
    return null;
  }

  const handleLike = async () => {
    const addedLike = {
      playlist_id: playlistId,
      user_id: sessionUser.id,
    };

    dispatch(likeThunk(addedLike));
  };

  // if (!likedPlaylists || !likedPlaylists.length) {
  //   dispatch(getLikeThunk(playlistId));
  //   return null;
  // }

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

          <p>{singlePlaylistObj.playlist_bio}</p>
          <button onClick={handleLike} className={liked ? "liked" : ""}>
            {liked ? "Unlike" : "Like"}
          </button>
        </div>
      )}
    </>
  );
}

export default SinglePlaylistPage;
