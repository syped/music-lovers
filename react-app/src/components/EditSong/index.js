import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSongThunk, getSingleSongThunk } from "../../store/song";
import { useModal } from "../../context/Modal";
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
  const { closeModal } = useModal();
  const [mp3, setMp3] = useState(null);
  const [mp3Loading, setMp3Loading] = useState(false);

  useEffect(() => {
    dispatch(getSingleSongThunk(song.id));
  }, [dispatch, song.id]);

  useEffect(() => {
    setName(song.song_name || "");
  }, [song]);

  function errorsChecked(name) {
    const errors = {};

    if (!name) errors.name = "Album name is required";
    if (!mp3) errors.mp3 = "Mp3 file is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsFound = errorsChecked(name);

    // const updatedSong = {
    //   id: song.id,
    //   user_id: userId,
    //   album_id: albumId, //HARD-CODED, FIX TO ALBUM NAME
    //   song_name: name,
    //   mp3: song.mp3,
    // };

    if (song) {
      console.log(song);
    }
    const formData = new FormData();
    formData.append("id", song.id);
    formData.append("user_id", userId);
    formData.append("album_id", albumId);
    formData.append("song_name", name);
    formData.append("mp3", mp3);

    setMp3Loading(true);

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(updateSongThunk(formData, song.id)).then(
        closeModal
      );

      // if (response.ok) {
      //   history.push(`/songs/${response.id}`);
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
          <h1>Update your Song(s)</h1>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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

          <div className="song-file-fields">
            <label>
              Song File:
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setMp3(e.target.files[0])}
              />
            </label>

            {hasSubmitted && errors.mp3 && (
              <p className="errors">{errors.mp3}</p>
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
