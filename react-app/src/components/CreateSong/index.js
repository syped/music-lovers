import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSongThunk } from "../../store/song";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getSingleAlbum } from "../../store/album";

function CreateSongForm({ submitted }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const { albumId } = useParams();

  const [name, setName] = useState("");
  const [mp3, setMp3] = useState(null);
  const [mp3Loading, setMp3Loading] = useState(false);
  const [errors, setErrors] = useState({});

  function errorsChecked(name, mp3) {
    const errors = {};
    if (!name) errors.name = "Song name is required";
    if (!mp3) errors.mp3 = "Mp3 file is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(name, mp3);

    const formData = new FormData();
    formData.append("mp3", mp3);
    formData.append("user_id", user.id);
    formData.append("album_id", albumId);
    formData.append("song_name", name);

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
      setMp3Loading(false);

      setName("");
      setMp3(null);

      // console.log("first");
      // dispatch(getSingleAlbum(albumId));
      submitted();
      // if (response.ok) {

      // history.push(`/albums/${albumId}`);
      // }
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
