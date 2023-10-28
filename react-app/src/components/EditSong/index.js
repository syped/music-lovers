import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSongThunk, getSingleSongThunk } from "../../store/song";
import "./EditSong.css";

function EditSong({ song, albumId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  //   const song = useSelector((state) => state.songs.singleSong);
  const userId = useSelector((state) => state.session.user.id);
  // const { songId } = useParams();

  const [name, setName] = useState(song.song_name);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getSingleSongThunk(song.id));
  }, [dispatch, song.id]);

  useEffect(() => {
    setName(song.song_name || "");
  }, [song]);

  function errorsChecked(name) {
    const errors = {};

    if (!name) errors.name = "Song name is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsFound = errorsChecked(name);

    const updatedSong = {
      id: song.id,
      user_id: userId,
      album_id: albumId, //HARD-CODED, FIX TO ALBUM NAME
      song_name: name,
      mp3: song.mp3,
    };

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(updateSongThunk(updatedSong));

      // if (response.ok) {
      //   history.push(`/songs/${response.id}`);
      // }
    }
  };

  return (
    <div className="main-edit-song-container">
      <div className="update-song-form">
        <div className="update-song-title">
        <h1>Update your Song(s)</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="song-form-fields">
            <label>
              Song Name:
              <div className="edit-song-name-box">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Song Name"
              />
              </div>
            </label>
            {hasSubmitted && errors.name && (
              <p className="errors">{errors.name}</p>
            )}
          </div>
          <div className="update-song-button">
          <button type="submit">Update Song</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSong;
