import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createSongThunk } from "../../store/song";
import "./CreateSong.css";

function CreateSongForm({ submitted, albumId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  // const { albumId } = useParams();

  const [name, setName] = useState("");
  const [mp3, setMp3] = useState(null);
  const [mp3Loading, setMp3Loading] = useState(false);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(createSongThunk(formData));
      setMp3Loading(false);

      setName("");
      setMp3(null);

      // console.log("first");
      // dispatch(getSingleAlbum(albumId));
      submitted();
      closeModal();
      // if (response.ok) {

      // history.push(`/albums/${albumId}`);
      // }
    }
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className="main-edit-song-container">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <div className="update-song-form">
        <div className="update-song-title">
          <h1>Upload Your Song</h1>
        </div>
        <form
          className="uploading-songs"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="upload-song-form-fields">
            <label>
              Song Name:
              <div className="song-name-box">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Song Name"
                />
              </div>
            </label>
            {errors.name && <p className="errors">{errors.name}</p>}
          </div>

          <div className="upload-song-file-fields">
            <label>Song File:</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setMp3(e.target.files[0])}
            />

            {errors.mp3 && <p className="errors">{errors.mp3}</p>}
          </div>

          <div className="upload-song-button">
            <button type="submit">Upload Song</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSongForm;
