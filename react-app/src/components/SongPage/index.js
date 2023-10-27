import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../store/song";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

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
        <AudioPlayer
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
          volume={0.1}
        />
      </div>
    </>
  );
}

export default AllSongs;
