import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSinglePlaylistThunk,
  getPlaylistSongsThunk,
} from "../../store/playlist";
import { likePlaylistThunk } from "../../store/likes";
import { getSongsThunk } from "../../store/song";
import OpenModalButton from "../OpenModalButton";
import AllSongsModal from "../AllSongsModal";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function SinglePlaylistPage() {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const allSongsObj = useSelector((state) => state.songs.allSongs);
  const playlist = useSelector((state) => state.playlists.singlePlaylist);
  // const likedPlaylist = useSelector((state) => state.likes.likedPlaylists);
  const [liked, setLiked] = useState(0);
  // const [numLikes, setNumLikes] = useState(playlist.likes);

  const singlePlaylistObj = useSelector(
    (state) => state.playlists.singlePlaylist
  );
  const playlistSongs = useSelector((state) => state.playlists.playlistSongs);

  const arr = Object.values(allSongsObj);
  const playlistArr = Object.values(playlistSongs);

  const handleLike = (playlistId) => {
    const payload = { playlist_id: playlistId, user_id: sessionUser.id, liked };
    dispatch(likePlaylistThunk(sessionUser.id, playlistId));
    console.log("BJKSDHDKSJGSD", sessionUser.id, playlistId);
  };

  // const addLike = () => {
  //   setLiked(!liked);
  //   setNumLikes(numLikes + 1);
  //   localStorage.setItem(`likes_${playlistId}`, numLikes + 1);
  // };

  // const removeLike = () => {
  //   setLiked(!liked);
  //   setNumLikes(numLikes - 1);
  //   localStorage.setItem(`likes_${playlistId}`, numLikes - 1);
  // };

  useEffect(() => {
    dispatch(getSinglePlaylistThunk(playlistId)).then(() => setIsLoaded(true));
    dispatch(getPlaylistSongsThunk(playlistId));
    // const likeStorage = localStorage.getItem(`likes_${playlistId}`);
    // if (likeStorage) {
    //   setNumLikes(parseInt(likeStorage, 10));
    // }
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

  //   if (!playlistArr || !playlistArr.length) {
  //     dispatch(getPlaylistSongsThunk(playlistId));
  //     return null;
  //   }

  if (!singlePlaylistObj || !singlePlaylistObj.id) return null;

  console.log("HEHEHEHEHEHEHEH", playlist);
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
          {/* {sessionUser ? (
            <FaHeart
              className="nav-icon"
              style={{ color: "rgb(176, 83, 239)" }}
              // onClick={handleLike}
            />
          ) : (
            <FaRegHeart className="nav-icon" onClick={handleLike} />
          )} */}
          <input
            type="checkbox"
            onClick={(e) => {
              handleLike(e.target.value);
            }}
            value={liked}
          />
          {/* <span>{numLikes} likes</span> */}
        </div>
      )}
    </>
  );
}

export default SinglePlaylistPage;
