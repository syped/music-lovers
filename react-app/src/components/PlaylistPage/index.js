import { useDispatch, useSelector } from "react-redux";
import {
  getPlaylistsThunk,
  addSongToPlaylistThunk,
} from "../../store/playlist";
import { likePlaylist, unlikePlaylist } from "../../store/likes";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";

function AllPlaylists() {
  const dispatch = useDispatch();

  const allPlaylistsObj = useSelector((state) => state.playlists.allPlaylists);
  const [likeCounts, setLikeCounts] = useState({});
  const likedPlaylists = useSelector((state) => state.likes.likedSongs);

  const arr = Object.values(allPlaylistsObj);

  useEffect(() => {
    const savedLikeCounts = JSON.parse(localStorage.getItem("likeCounts"));
    if (savedLikeCounts) {
      setLikeCounts(savedLikeCounts);
    }
  }, []);

  // const handleAddSong = () => {
  //   dispatch(addSongToPlaylistThunk(playlistId, songId))
  // }

  const handleLikeClick = (playlistId) => {
    const isLiked = likedPlaylists.includes(playlistId);
    if (isLiked) {
      dispatch(unlikePlaylist(playlistId));
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [playlistId]: (prevCounts[playlistId] || 0) - 1,
      }));
    } else {
      dispatch(likePlaylist(playlistId));
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [playlistId]: (prevCounts[playlistId] || 0) + 1,
      }));
    }
  };

  useEffect(() => {
    localStorage.setItem("likeCounts", JSON.stringify(likeCounts));
  }, [likeCounts]);

  if (!arr || !arr.length) {
    dispatch(getPlaylistsThunk());
    return null;
  }

  return (
    <>
      <div>
        {arr.map((playlist) => (
          <div className="playlist-card">
            <img src={playlist.playlist_image} />
            <div>{playlist.playlist_name}</div>
            <div>{playlist.user_id}</div>
            {/* change to user_id name */}
            <div>{playlist.playlist_bio}</div>
            {/* <button onClick={handleAddSong}>Add Song</button> */}
            {/* <button onClick={() => handleLikeClick(playlist.id)}>
              {likedPlaylists.includes(playlist.id) ? "Unlike" : "Like"}
            </button> */}
            <span>{likeCounts[playlist.id] || 0}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllPlaylists;
