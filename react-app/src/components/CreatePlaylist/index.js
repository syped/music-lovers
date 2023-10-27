import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPlaylistThunk } from "../../store/playlist";
import "./CreatePlaylist.css";

function CreatePlaylistForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({});

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // function errorsChecked(name) {
  //     const errors = {};
  //     if (!name) errors.name = "Playlist name is required";

  //     setErrors(errors);

  //     return errors;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const errorsFound = errorsChecked(name);

    const formData = new FormData();
    formData.append("playlist_image", image);
    formData.append("user_id", userId);
    formData.append("playlist_name", name);
    formData.append("playlist_bio", bio);
    //do i add bio????

    setImageLoading(true);

    // if (Object.keys(errorsFound).length === 0) {
    const response = await dispatch(createPlaylistThunk(formData));

    if (response) {
      history.push(`/playlists/${response.id}`);
    }
    // }
  };

  return (
    <div className="create-playlist-container">
      <div className="form-container">
        <h1 className="create-playlist-title">Create your Playlist</h1>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-upload">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {imageLoading && <p>Loading...</p>}
        </div>

        <div className="playlist-form-fields">
          <label>
            Playlist
            <div className="playlist-name-box">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Playlist Name"
            />
            </div>
          </label>
          {/* {errors.name && <p className="errors">{errors.name}</p>} */}
        </div>
        <div className="form-fields">
          <label>
            Playlist Bio
            <div className="playlist-bio-box">
            <input
              type="textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Playlist Bio"
            />
            </div>
          </label>

          {/* {errors.releaseYear && <p className="errors">{errors.bio}</p>} */}
        </div>
        <div className="create-playlist-button">
        <button type="submit">Create Playlist</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePlaylistForm;
