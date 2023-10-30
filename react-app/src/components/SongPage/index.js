import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../store/song";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { getAlbums } from "../../store/album";
import { useEffect } from "react";

function AllSongs({ selectedSong, selectedList }) {
  const dispatch = useDispatch();

  const allSongsObj = useSelector((state) => state.songs.allSongs);
  const allAlbums = useSelector((state) => state.albums.allAlbums);

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
      <h1 className="all-songs-header">All Songs</h1>
      <div className="song-page-container">
        <h3 className="single-album-header">Title</h3>
        <h3 className="songs-album-header">Album</h3>
        <div className="underline-song"></div>
        <div className="song-container">
          {arr.map((song) => (
            <div className="single-song">
              {/* add picture */}
              <img
                className="song-card-album-cover"
                src={allAlbums[song.album_id]?.album_image}
              />
              <img
                onClick={() => {
                  handleClick(song.id); //ADDDDDDDDDDD SONGGG
                  selectedList(arr);
                }}
                className="song-play-song"
                src={playIcon}
              />
              <div>{song.song_name}</div>

              {/* add .firstName to song.user_id */}
              <div className="songs-album-name">
                {allAlbums[song.album_id] &&
                  allAlbums[song.album_id].album_name}
              </div>
            </div>
          ))}
        </div>
        <div className="song-page-background"></div>
      </div>
    </>
  );
}

export default AllSongs;
