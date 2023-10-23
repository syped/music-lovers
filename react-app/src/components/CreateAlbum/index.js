import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbumThunk } from "../../store/album";

function CreateAlbumForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user.id);

  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [errors, setErrors] = useState({});

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

    const newAlbum = {
      user_id: userId,
      album_name: name,
      release_year: releaseYear,
    };

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(createAlbumThunk(newAlbum));

      if (response) {
        history.push(`/albums/${response.id}`);
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <h1>Upload your Album</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <label>
            Album
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Album Name"
            />
          </label>
          {errors.name && <p className="errors">{errors.name}</p>}
        </div>
        <div className="form-fields">
          <label>
            Release Year
            <input
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              placeholder="Release Year"
            />
          </label>
          {errors.releaseYear && <p className="errors">{errors.releaseYear}</p>}
        </div>
        <button type="submit">Upload Album</button>
      </form>
    </>
  );
}

export default CreateAlbumForm;
