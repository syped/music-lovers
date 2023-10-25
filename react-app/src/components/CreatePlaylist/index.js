import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPlaylistThunk } from "../../store/playlist";

function CreatePlaylistForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [pp, setPp] = useState(true);
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
    formData.append('pp', pp)
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
    <>
      <div className="form-container">
        <h1>Create your Playlist</h1>
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

        <div className="form-fields">
          <label>
            Playlist
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Playlist Name"
            />
          </label>
          {/* {errors.name && <p className="errors">{errors.name}</p>} */}
        </div>
        <div className="form-fields">
          <label>
            Playlist Bio
            <input
              type="textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Playlist Bio"
            />
          </label>
          <label class="switch">
            <input type="checkbox" onChange={(e) => setPp(e.target.value)} placeholder="public" value="pp" />
            <label>Private</label>
          </label>
          {/* {errors.releaseYear && <p className="errors">{errors.bio}</p>} */}
        </div>
        <button type="submit">Create Playlist</button>
      </form>
    </>
  );
}

export default CreatePlaylistForm;
