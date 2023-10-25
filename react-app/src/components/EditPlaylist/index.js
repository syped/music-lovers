import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  updatePlaylistThunk,
  getSinglePlaylistThunk,
} from "../../store/playlist";

function EditPlaylist({ playlistId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const playlist = useSelector((state) => state.playlists.singlePlaylist);
  const userId = useSelector((state) => state.session.user.id);

  const [name, setName] = useState(playlist.playlist_name);
  const [bio, setBio] = useState(playlist.playlist_bio);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  //   const [image, setImage] = useState(null);
  //   const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    dispatch(getSinglePlaylistThunk(playlistId));
  }, [dispatch, playlistId]);

  useEffect(() => {
    setName(playlist.playlist_name || "");
    setBio(playlist.playlist_bio || "");
    // setImage(playlist.playlist_image || "");
  }, [playlist]);

  function errorsChecked(name, bio) {
    const errors = {};

    if (!name) errors.name = "Playlist name is required";
    if (!bio) errors.bio = "Playlist bio is required";

    setErrors(errors);

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsFound = errorsChecked(name, bio);

    // const formData = new FormData();
    // formData.append("user_id", userId);
    // formData.append("id", playlistId);
    // formData.append("playlist_name", name);
    // formData.append("playlist_bio", bio);
    // formData.append("playlist_image", playlist.playlist_image);

    const updatedPlaylist = {
      user_id: userId,
      id: playlistId,
      playlist_name: name,
      playlist_bio: bio,
      playlist_image: playlist.playlist_image,
    };

    if (Object.keys(errorsFound).length === 0) {
      const response = await dispatch(updatePlaylistThunk(updatedPlaylist));

      if (response) {
        history.push(`/playlists/${response.id}`);
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <h1>Update your Playlist</h1>
      </div>
      <form onSubmit={handleSubmit}>
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
          {hasSubmitted && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </div>
        <div className="form-fields">
          <label>
            Playlist Bio
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Playlist Bio"
            />
          </label>
          {hasSubmitted && errors.bio && <p className="errors">{errors.bio}</p>}
        </div>
        <button type="submit">Update Playlist</button>
      </form>
    </>
  );
}

export default EditPlaylist;
