import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSongThunk, getSingleSongThunk } from "../../store/song";

function EditSong({ song, albumId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  //   const song = useSelector((state) => state.songs.singleSong);
  const userId = useSelector((state) => state.session.user.id);
  // const { songId } = useParams();

  const [name, setName] = useState(song.song_name);
  const [length, setLength] = useState(song.length);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getSingleSongThunk(song.id));
  }, [dispatch, song.id]);

  useEffect(() => {
    setName(song.song_name || "");
    setLength(song.length || "");
  }, [song]);

  function errorsChecked(name, length) {
    const errors = {};

    if (!name) errors.name = "Album name is required";
    if (!length) errors.length = "Length of song is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsFound = errorsChecked(name, length);

    const updatedSong = {
      id: song.id,
      user_id: userId,
      album_id: albumId, //HARD-CODED, FIX TO ALBUM NAME
      song_name: name,
      length: length,
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
    <>
      <div className="create-song-form">
        <h1>Update your Song(s)</h1>
        <form onSubmit={handleSubmit}>
          <div className="song-form-fields">
            <label>
              Song Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Song Name"
              />
            </label>
            {hasSubmitted && errors.name && (
              <p className="errors">{errors.name}</p>
            )}
          </div>
          <div className="song-form-fields">
            <label>
              Length:
              <input
                type="text"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Length of Song"
              />
            </label>
            {hasSubmitted && errors.name && (
              <p className="errors">{errors.length}</p>
            )}
          </div>

          <button type="submit">Update Song</button>
        </form>
      </div>
    </>
  );
}

export default EditSong;
