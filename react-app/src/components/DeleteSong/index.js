import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSongThunk } from "../../store/song";
import "./DeleteSong.css";

function DeleteSongModal({ song, submitted }) {
  const dispatch = useDispatch();
  const [exist, setExist] = useState(true);
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSongThunk(song.id));
    submitted();
    closeModal();
    setExist(false);
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <>
      {exist && (
        <div className="delete-playlist-modal">
          <button className="close-button" onClick={handleClose}>
            X
          </button>
          <h2 className="delete-playlist">Confirm Delete</h2>
          <div className="are-you-sure">
            Are you sure you want to remove this song?
          </div>
          <button className="yes-delete-playlist" onClick={confirmDelete}>
            Yes (Delete Song)
          </button>
          <button className="no-delete-playlist" onClick={cancelDelete}>
            No (Keep Song)
          </button>
        </div>
      )}
    </>
  );
}

export default DeleteSongModal;
