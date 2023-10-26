import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongsThunk } from "../../store/song";
import { addSongToPlaylistThunk } from "../../store/playlist";

function AllSongsModal({playlistId}) {
    const dispatch = useDispatch();
    // const { playlistId } = useParams();
    const [selectedSong, setSelectedSong] = useState("");
    console.log('WHERES WALDO', selectedSong)

    const allSongsObj = useSelector((state) => state.songs.allSongs);

    const arr = Object.values(allSongsObj);

    if (!arr || !arr.length) {
      dispatch(getSongsThunk());
      return null;
    }

    const handleAddSongClick = (songId) => {
      dispatch(addSongToPlaylistThunk(playlistId, songId))
      console.log('HELLLO', songId, playlistId)

    }

    return (
      <>
        <div>
          {arr.map((song) => (
            <div className="song-card" key={song.id}>
              {/* add picture */}
              <div>{song.song_name}</div>
              <div>{song.user_id}</div>
              {/* add .firstName to song.user_id */}
              <div>{song.album_id}</div>
              <button onClick={(e) => {handleAddSongClick(e.target.value)}} value={song.id}>Add</button>
            </div>
          ))}
        </div>
      </>
    );
}

export default AllSongsModal;
