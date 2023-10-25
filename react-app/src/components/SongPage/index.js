import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../store/song";
import { likeSong, unlikeSong } from "../../store/likes";
import { useState, useEffect } from "react";

function AllSongs() {
  const dispatch = useDispatch();

  const allSongsObj = useSelector((state) => state.songs.allSongs);
  const likedSongs = useSelector((state) => state.likes.likedSongs);
  const [likeCounts, setLikeCounts] = useState({});

  const arr = Object.values(allSongsObj);

  useEffect(() => {
    const savedLikeCounts = JSON.parse(localStorage.getItem('likeCounts'));
    if (savedLikeCounts) {
      setLikeCounts(savedLikeCounts);
    }
  }, []);

  const handleLikeClick = (songId) => {
    const isLiked = likedSongs.includes(songId);
    if (isLiked) {
      dispatch(unlikeSong(songId));
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [songId]: (prevCounts[songId] || 0) - 1,
      }));
    } else {
      dispatch(likeSong(songId));
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [songId]: (prevCounts[songId] || 0) + 1,
      }));
    }
  };

  useEffect(() => {
    localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
  }, [likeCounts]);

  if (!arr || !arr.length) {
    dispatch(getSongsThunk());
    return null;
  }

  return (
    <>
      <div>
        {arr.map((song) => (
          <div className="song-card">
            {/* add picture */}
            <div>{song.song_name}</div>
            <div>{song.user_id}</div>
            {/* add .firstName to song.user_id */}
            <div>{song.album_id}</div>

            <button
            onClick={() => handleLikeClick(song.id)}
          >
            {likedSongs.includes(song.id) ? 'Unlike' : 'Like'}
          </button>
          <span>{likeCounts[song.id] || 0}</span>
        </div>
        ))}
      </div>
    </>
  );
}

export default AllSongs;
