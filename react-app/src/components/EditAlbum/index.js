import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateAlbumThunk, getSingleAlbum } from "../../store/album";
import "./EditAlbum.css";

function EditAlbum({ albumId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const album = useSelector((state) => state.albums.singleAlbum);
  const userId = useSelector((state) => state.session.user.id);
  // const { albumId } = useParams();

  const [name, setName] = useState(album.album_name);
  const [releaseYear, setReleaseYear] = useState(album.release_year);
  // const [albumCover, setAlbumCover] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getSingleAlbum(albumId));
  }, [dispatch, albumId]);

  useEffect(() => {
    setName(album.album_name || "");
    setReleaseYear(album.release_year || "");
  }, [album]);

  function errorsChecked(name, releaseYear) {
    const errors = {};

    if (!name) errors.name = "Album name is required";
    if (!releaseYear) errors.releaseYear = "Release year is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsFound = errorsChecked(name, releaseYear);

    const updatedAlbum = {
      user_id: userId,
      id: albumId,
      album_name: name,
      release_year: releaseYear,
    };

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(updateAlbumThunk(updatedAlbum));

      if (response) {
        history.push(`/albums/${response.id}`);
      }
    }
  };

  return (
    <div className="main-edit-album-form-container">
      <div className="update-album-form-container">
        <h1 className="update-your-album-title">Update your Album</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="edit-album-form-fields">
          <label>
            Album
            <div className="edit-album-name-box">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Album Name"
            />
            </div>
          </label>
          {hasSubmitted && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </div>
        <div className="edit-release-year-form-fields">
          <label>
            Release Year
            <div className="edit-release-year-box">
            <input
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              placeholder="Release Year"
            />
            </div>
          </label>
          {hasSubmitted && errors.releaseYear && (
            <p className="errors">{errors.releaseYear}</p>
          )}
        </div>
        <div className="update-album-button">
        <button type="submit">Update Album</button>
        </div>
      </form>
    </div>
  );
}

export default EditAlbum;
