import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteAlbumThunk } from "../../store/album";
import "./DeleteAlbumModal.css";

function DeleteAlbumModal({ albumId, submitted }) {
  const dispatch = useDispatch();
  const [exist, setExist] = useState(true);
  const { closeModal } = useModal();

  const confirmDelete = (e) => {
    e.preventDefault();
    dispatch(deleteAlbumThunk(albumId));
    closeModal();
    submitted();
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
        <>
          <div className="delete-album-modal">
            <button className="close-button" onClick={handleClose}>
              X
            </button>
            <h2 className="delete-album">Confirm Delete</h2>
            <div className="are-you-sure">
              Are you sure you want to remove this album?
            </div>
            <div className="delete-modal-buttons">
              <button className="yes-delete-album" onClick={confirmDelete}>
                Yes (Delete Album)
              </button>
              <button className="no-delete-album" onClick={cancelDelete}>
                No (Keep Album)
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DeleteAlbumModal;
