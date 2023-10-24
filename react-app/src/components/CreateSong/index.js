import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSongThunk } from "../../store/song";

function CreateSongForm({ dataFromAlbum, onSongSubmit }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);
  // const albumId = useSelector((state) => state.songs.)

  const [name, setName] = useState("");
  const [length, setLength] = useState("");
  const [mp3, setMp3] = useState(null);
  const [mp3Loading, setMp3Loading] = useState(false);
  const [errors, setErrors] = useState({});

  function errorsChecked(name, length, mp3) {
    const errors = {};
    if (!name) errors.name = "Song name is required";
    if (!length) errors.length = "Length of the song is required";
    if (!mp3) errors.mp3 = "Mp3 file is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(name, length, mp3);

    const formData = new FormData();
    formData.append("mp3", mp3);
    formData.append("user_id", userId);
    formData.append("album_id", dataFromAlbum);
    formData.append("song_name", name);
    formData.append("length", length);

    setMp3Loading(true);

    // const newSong = {
    //   user_id: userId,
    //   album_id: 1, //HARD-CODED, FIX TO ALBUM NAME
    //   song_name: name,
    //   length: length,
    //   mp3: mp3,
    // };

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(createSongThunk(formData));

      onSongSubmit();

      if (response.ok) {
        history.push(`/songs/${response.id}`);
      }
    }
  };

  return (
    <>
      <div className="create-song-form">
        <h1>Upload your Song(s)</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            {errors.name && <p className="errors">{errors.name}</p>}
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
            {errors.name && <p className="errors">{errors.length}</p>}
          </div>
          <div className="song-form-fields">
            <label>
              Song File:
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setMp3(e.target.files[0])}
              />
              {mp3Loading && <p>Loading...</p>}
            </label>
            {errors.name && <p className="errors">{errors.mp3}</p>}
          </div>
          <button type="submit">Upload Song</button>
        </form>
      </div>
    </>
  );
}

export default CreateSongForm;
