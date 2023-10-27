import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateAlbumThunk, getSingleAlbum } from "../../store/album";

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
    <>
      <div className="form-container">
        <h1>Update your Album</h1>
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
          {hasSubmitted && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
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
          {hasSubmitted && errors.releaseYear && (
            <p className="errors">{errors.releaseYear}</p>
          )}
        </div>
        <button type="submit">Update Album</button>
      </form>
    </>
  );
}

export default EditAlbum;
