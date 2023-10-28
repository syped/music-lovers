// import { useEffect, useState } from "react";
// import CreateAlbumForm from "../CreateAlbum";
// import CreateSongForm from "../CreateSong";

// function CreateAlbumSongForm() {
//   const [albumId, setAlbumId] = useState(null);
//   const [songAdded, setSongAdded] = useState(false);
//   const [albumSubmitted, setAlbumSubmitted] = useState(false);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (albumSubmitted) {
//     }
//   });

//   const handleAddSong = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <CreateAlbumForm
//         canSubmitAlbum={songAdded}
//         onAlbumSubmit={(data) => {
//           setAlbumId(data);
//           setAlbumSubmitted(true);
//         }}
//       />
//       {[...Array(count)].map((_, index) => (
//         <div className="song-form" key={index}>
//           <CreateSongForm
//             onSongAdd={() => setSongAdded(true)}
//             albumId={albumId}
//           />
//         </div>
//       ))}
//       <button onClick={handleAddSong}>Add Song</button>
//     </div>
//   );
// }

// export default CreateAlbumSongForm;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbumThunk } from "../../store/album";
import { createSongThunk } from "../../store/song";
import "./CreateAlbumForm.css"


function CreateAlbumSongForm() {
  const [songAdded, setSongAdded] = useState(false);
  const [count, setCount] = useState(0);
  const history = useHistory();

  const albumFormRef = useRef();
  const songFormRef = useRef();

  const handleAddSong = () => {
    setCount(count + 1);
  };

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user.id);

  const [name, setName] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [songName, setSongName] = useState("");
  const [length, setLength] = useState("");
  const [mp3, setMp3] = useState(null);
  const [mp3Loading, setMp3Loading] = useState(false);

  useEffect(() => {
    if ((songName, length, mp3)) {
      setSongAdded(true);
    }
  });

  const handleSubmitAlbum = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("album_image", image);
    formData.append("user_id", userId);
    formData.append("album_name", name);
    formData.append("release_year", releaseYear);

    setImageLoading(true);

    if (songAdded) {
      const response = await dispatch(createAlbumThunk(formData));
      const id = response.id;

      handleSongSubmit(id);

      //   songFormRef.current.submit();
    }
  };

  const handleSongSubmit = async (id) => {
    // e.preventDefault();

    const formData = new FormData();
    formData.append("mp3", mp3);
    formData.append("user_id", userId);
    formData.append("album_id", id);
    formData.append("song_name", songName);
    formData.append("length", length);

    setMp3Loading(true);

    await dispatch(createSongThunk(formData));
    setSongName("");
    setLength("");
    setMp3(null);

    history.push(`/albums/${id}`);
  };

  return (
    <div>
      <>
        <div className="form-container">
          <h1>Upload your Album</h1>
        </div>
        <form
          ref={albumFormRef}
          onSubmit={handleSubmitAlbum}
          encType="multipart/form-data"
        >
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
            </label>
            <div className="album-name-box">
              <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Album Name"
              />
              </div>
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
          </div>
          <div className="upload-album-button">
            <button type="submit" disabled={!songAdded}>
            Upload Album
          </button>
          </div>
        </form>
      </>
      {[...Array(count)].map((_, index) => (
        <div className="song-form" key={index}>
          <div className="create-song-form">
            <h1>Upload your Song(s)</h1>
            <form
              ref={songFormRef}
              onSubmit={handleSongSubmit}
              encType="multipart/form-data"
            >
              <div className="song-form-fields">
                <label>
                  Song Name:
                  <input
                    type="text"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    placeholder="Song Name"
                  />
                </label>
              </div>
              <div className="song-form-fields">
                <label>
                  Length:
                  <input
                    type="text"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Length of Song"
                  />
                </label>
              </div>
              <div className="song-form-fields">
                <label>
                  Song File:
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setMp3(e.target.files[0])}
                  />
                  {mp3Loading && <p>Loading...</p>}
                </label>
              </div>
              {/* <button type="submit">Upload Song</button> */}
            </form>
          </div>
        </div>
      ))}
      <button onClick={handleAddSong}>Add Song</button>
    </div>
  );
}

export default CreateAlbumSongForm;
