import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../store/song";

function AllSongs() {
  const dispatch = useDispatch();

  const allSongsObj = useSelector((state) => state.songs.allSongs);

  const arr = Object.values(allSongsObj);

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
          </div>
        ))}
      </div>
    </>
  );
}

export default AllSongs;
