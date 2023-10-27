import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbumThunk } from "../../store/album";
import "./CreateAlbum.css";

function CreateAlbumForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);

  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [errors, setErrors] = useState({});

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  function errorsChecked(name, releaseYear) {
    const errors = {};
    if (!name) errors.name = "Album name is required";
    if (!releaseYear) errors.releaseYear = "Release year is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = errorsChecked(name, releaseYear);

    const formData = new FormData();
    formData.append("album_image", image);
    formData.append("user_id", userId);
    formData.append("album_name", name);
    formData.append("release_year", releaseYear);

    setImageLoading(true);

    // const newAlbum = {
    //   user_id: userId,
    //   album_name: name,
    //   release_year: releaseYear,
    // };

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(createAlbumThunk(formData));

      if (response) {
        history.push(`/albums/${response.id}`);
      }
    }
  };

  return (
    <div className="upload-album-container">
      <div className="form-container">
        <h1 className="upload-title">Upload your Album</h1>
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
            Album
            <div className="album-name-box">
              <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Album Name"
              />
            </div>
          </label>
          {errors.name && <p className="errors">{errors.name}</p>}
        </div>
        <div className="form-fields">
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
          {errors.releaseYear && <p className="errors">{errors.releaseYear}</p>}
        </div>
        <button type="submit" className="upload-button-container">Upload Album</button>
      </form>
    </div>
  );
}

export default CreateAlbumForm;
