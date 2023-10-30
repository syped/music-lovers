import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPlaylistThunk } from "../../store/playlist";
import "./CreatePlaylist.css";

function CreatePlaylistForm({ reload }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({});

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  function errorsChecked(name, bio, image) {
    const errors = {};
    if (!name) errors.name = "Playlist name is required";
    if (name.length > 35) errors.name = "Playlist name is too long";
    if (!bio) errors.bio = "Bio is required";
    if (!image) errors.image = "Image is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(name, bio, image);

    const formData = new FormData();
    formData.append("playlist_image", image);
    formData.append("user_id", userId);
    formData.append("playlist_name", name);
    formData.append("playlist_bio", bio);
    //do i add bio????

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(createPlaylistThunk(formData));
      setImageLoading(true);

      if (response) {
        reload();
        history.push(`/playlists/${response.id}`);
      }
    }
  };
  // const isButtonDisabled = () => {
  //   return !name || !bio;
  // };

  return (
    <div className="main-upload-album-container">
      <div className="upload-album-container">
        <div className="upload-background">
          <div className="form-container">
            <div className="upload-title">Create your Playlist</div>
          </div>
          <form
            className="upload-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="form-upload-album">
              {" "}
              <label>Upload your Playlist Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {errors.image && (
                <p className="upload-album-errors">{errors.image}</p>
              )}
              {imageLoading && <p>Loading...</p>}
            </div>

            <div className="form-upload-album">
              <label>
                Playlist Name
                <div className="album-name-box">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Playlist Name"
                  />
                </div>
              </label>
              {errors.name && (
                <p className="upload-album-errors">{errors.name}</p>
              )}
            </div>
            <div className="playlist-bio">
              <label>
                Playlist Bio
                <div className="bio-box">
                  <textarea
                    type="textarea"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Playlist Bio"
                  />
                </div>
              </label>
              {errors.bio && (
                <p className="upload-album-errors">{errors.bio}</p>
              )}
            </div>
            <div className="upload-album-button">
              <button type="submit" className={`create-button-container`}>
                Create Playlist
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePlaylistForm;
