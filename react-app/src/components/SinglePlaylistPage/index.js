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
import { toggleThunk, getLikeThunk } from "../../store/likes";

function SinglePlaylistPage() {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const allSongsObj = useSelector((state) => state.songs.allSongs);
  const allLikedPlaylists = useSelector((state) => state.likes.likedPlaylists);
  const playlistSongs = useSelector((state) => state.playlists.playlistSongs);
  const playlistArr = Object.values(playlistSongs);
  const arr = Object.values(allSongsObj);
  const allLikedArr = Object.values(allLikedPlaylists);
  const [liked, setLiked] = useState("");
  // console.log(allLikedArr.length);

  const singlePlaylistObj = useSelector(
    (state) => state.playlists.singlePlaylist
  );

  const handleLike = async () => {
    await dispatch(toggleThunk(playlistId));
    await dispatch(getLikeThunk(playlistId));

    if (liked) {
      setLiked("");
    } else {
      setLiked("liked");
    }
  };

  useEffect(() => {
    dispatch(getSinglePlaylistThunk(playlistId));
    dispatch(getPlaylistSongsThunk(playlistId));
    dispatch(getLikeThunk(playlistId)).then(() => setIsLoaded(true));
  }, [dispatch, playlistId]);

  useEffect(() => {
    if (sessionUser) {
      for (let i = 0; i < allLikedArr.length; i++) {
        let like = allLikedArr[i][0];

        if (
          like &&
          like.playlist_id === parseInt(playlistId) &&
          like.user_id === sessionUser.id
        ) {
          setLiked("liked");
        }

        // for (let j = 0; j < playlistArr.length; j++) {
        //   if (
        //     like.playlist_id === playlistArr[j].id &&
        //     like.user_id === sessionUser.id
        //   ) {
        //     setLiked("");
        //   } else {
        //     setLiked("liked");
        //   }
        // }
      }
    }
  }, [allLikedArr, playlistArr, sessionUser]);

  if (!arr || !arr.length) {
    dispatch(getSongsThunk());
    return null;
  }

  if (!allLikedArr || !allLikedArr.length) {
    dispatch(getLikeThunk(playlistId));
    return null;
  }

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
          <img src={singlePlaylistObj.playlist_image} />
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
