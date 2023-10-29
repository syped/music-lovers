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

function SinglePlaylistPage({ selectedSong, selectedList }) {
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

  const playIcon = process.env.PUBLIC_URL + "/images/PLAY.svg";

  const handleLike = async () => {
    await dispatch(toggleThunk(playlistId));
    await dispatch(getLikeThunk(playlistId));

    if (liked) {
      setLiked("");
    } else {
      setLiked("liked");
    }
  };

  const isOwner = sessionUser && singlePlaylistObj.user_id === sessionUser.id;

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

  const handleClick = (id) => {
    for (let i = 0; i < playlistSongsArr.length; i++) {
      if (id === playlistSongsArr[i].id) {
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
            className="single-album-image"
            src={singlePlaylistObj.playlist_image}
          />
          <div className="single-playlist-name-bio">
            <div className="single-album-name">
              {singlePlaylistObj.playlist_name}
            </div>
            <div className="single-playlist-bio">
              {singlePlaylistObj.playlist_bio}
            </div>
          </div>
          <button
            onClick={handleLike}
            id="playlist-like"
            className={liked ? "liked" : ""}
          >
            {liked ? "Unlike" : "Like"}
          </button>
          {isOwner && (
            <div className="add-song-button-playlist">
              <OpenModalButton
                buttonText="Add Song"
                modalComponent={<AllSongsModal playlistId={playlistId} />}
              />
            </div>
          )}
          <h3 className="single-album-header">Title</h3>
          <div className="underline"></div>
          <div className="single-album-song-container">
            {playlistSongsArr.map((song) => (
              <div className="single-album-song">
                <img
                  onClick={() => {
                    handleClick(song.id); //ADDDDDDDDDDD SONGGG
                    selectedList(playlistSongsArr);
                  }}
                  className="song-play-playlist"
                  src={playIcon}
                />
                <div>{song.song_name}</div>
              </div>
            ))}
          </div>
          <div className="single-album-song-background"></div>
        </div>
      )}
    </>
  );
}

export default SinglePlaylistPage;
