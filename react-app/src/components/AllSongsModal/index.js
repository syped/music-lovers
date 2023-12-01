import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongsThunk } from "../../store/song";
import { addSongToPlaylistThunk } from "../../store/playlist";
import { useModal } from "../../context/Modal";
import "./AllSongsModal.css";

function AllSongsModal({ playlistId, submitted }) {
  const dispatch = useDispatch();
  // const { playlistId } = useParams();
  const { closeModal } = useModal();
  const [selectedSong, setSelectedSong] = useState("");
  const [addedSongs, setAddedSongs] = useState([]);
  console.log("WHERES WALDO", selectedSong);

  const allSongsObj = useSelector((state) => state.songs.allSongs);
  const allAlbums = useSelector((state) => state.albums.allAlbums);

  const arr = Object.values(allSongsObj);

  if (!arr || !arr.length) {
    dispatch(getSongsThunk());
    return null;
  }

  const handleAddSongClick = (songId) => {
    const addedSong = {
      playlist_id: playlistId,
      song_id: songId,
    };

    if (!addedSongs.includes(songId)) {
      dispatch(addSongToPlaylistThunk(addedSong));
      setAddedSongs((prevAddedSongs) => [...prevAddedSongs, songId]);
    }

    submitted();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className="entire-add-songs-modal">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <h2 className="add-songs-modal-header">Add Songs to Playlist</h2>
      <div className="add-songs-modal-content">
        <div className="add-songs-list">
          {arr.map((song) => (
            <div className="song-card" key={song.id}>
              <img
                className="song-card-album-cover"
                src={allAlbums[song.album_id - 1]?.album_image}
              />
              <div className="add-songs-modal-name">{song.song_name}</div>
              {/* add .firstName to song.user_id */}
              <div className="add-songs-album-name">
                {allAlbums[song.album_id] &&
                  allAlbums[song.album_id - 1]?.album_name}
              </div>
              <button
                className="add-songs-modal-button"
                onClick={() => handleAddSongClick(song.id)}
                disabled={addedSongs.includes(song.id)}
              >
                {addedSongs.includes(song.id) ? "Added" : "Add"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllSongsModal;
