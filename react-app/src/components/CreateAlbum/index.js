import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbumThunk } from "../../store/album";
import "./CreateAlbum.css";

function CreateAlbumForm({ reload }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);

  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [errors, setErrors] = useState({});

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const soundWaves = process.env.PUBLIC_URL + "/images/MUSICWAVES.gif";

  function errorsChecked(name, releaseYear, image) {
    const errors = {};
    if (!name) errors.name = "Album name is required";
    if (name.length > 35) errors.name = "Album name is too long";
    if (!releaseYear) errors.releaseYear = "Release year is required";
    if (!image) errors.image = "Image is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(name, releaseYear, image);

    const formData = new FormData();
    formData.append("album_image", image);
    formData.append("user_id", userId);
    formData.append("album_name", name);
    formData.append("release_year", releaseYear);

    // const newAlbum = {
    //   user_id: userId,
    //   album_name: name,
    //   release_year: releaseYear,
    // };

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(createAlbumThunk(formData));
      setImageLoading(true);

      if (response) {
        reload();
        history.push(`/albums/${response.id}`);
      }
    }
  };

  return (
    <div className="main-upload-album-container">
      <div className="upload-album-container">
        <div className="upload-background">
          <div className="form-container">
            <div className="upload-title">Create your Album</div>
          </div>
          <form
            className="upload-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="form-upload-album">
              {" "}
              <label>Upload your Album Picture:</label>
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
                Album Name
                <div className="album-name-box">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Album Name"
                  />
                </div>
              </label>
              {errors.name && (
                <p className="upload-album-errors">{errors.name}</p>
              )}
            </div>
            <div className="form-upload-album">
              <label>
                Release Year
                <div className="release-year-box">
                  <input
                    type="number"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    placeholder="Release Year"
                  />
                </div>
              </label>
              {errors.releaseYear && (
                <p className="upload-album-errors">{errors.releaseYear}</p>
              )}
            </div>
            <div className="upload-album-button">
              <button type="submit" className="upload-button-container">
                Create Album
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAlbumForm;
