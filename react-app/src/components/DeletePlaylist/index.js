import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deletePlaylistThunk } from "../../store/playlist";

function DeletePlaylistModal({ playlistId, submitted }) {
  const dispatch = useDispatch();
  const [exist, setExist] = useState(true);
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deletePlaylistThunk(playlistId)).then(closeModal);
    submitted();
    setExist(false);
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      {exist && (
        <div className="delete-modal">
          <h2 className="delete-playlist">Confirm Delete</h2>
          <div>Are you sure you want to remove this Playlist?</div>
          <button className="yes-delete" onClick={confirmDelete}>
            Yes (Delete Playlist)
          </button>
          <button className="no-delete" onClick={cancelDelete}>
            No (Keep Playlist)
          </button>
        </div>
      )}
    </>
  );
}

export default DeletePlaylistModal;
