import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../store/song";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function AllSongs({ selectedSong, selectedList }) {
  const dispatch = useDispatch();

  const allSongsObj = useSelector((state) => state.songs.allSongs);

  const arr = Object.values(allSongsObj);

  if (!arr || !arr.length) {
    dispatch(getSongsThunk());
    return null;
  }

  const playIcon = process.env.PUBLIC_URL + "/images/PLAY.svg";

  const handleClick = (id) => {
    for (let i = 0; i < arr.length; i++) {
      if (id === arr[i].id) {
        console.log("first", i);
        selectedSong(i);
      }
    }
  };

  return (
    <>
      <div className="single-album-container">
        <h3 className="single-album-header">Title</h3>
        <div className="underline"></div>
        <div className="song-container">
          {arr.map((song) => (
            <div className="single-album-song">
              {/* add picture */}
              <img
                onClick={() => {
                  handleClick(song.id); //ADDDDDDDDDDD SONGGG
                  selectedList(arr);
                }}
                className="song-play-playlist"
                src={playIcon}
              />
              <div>{song.song_name}</div>
              <div>{song.user_id}</div>
              {/* add .firstName to song.user_id */}
              <div>{song.album_id}</div>
            </div>
          ))}
        </div>
        <div className="single-album-song-background"></div>
      </div>
    </>
  );
}

export default AllSongs;
