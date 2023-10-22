import { useState } from "react";
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { deleteAlbumThunk } from "../../store/album"

function DeleteAlbumModal ({ albumId }) {
    const dispatch = useDispatch();
    const [exist, setExist] = useState(true)
    const { closeModal } = useModal();

    const confirmDelete = (e) => {
        e.preventDefault();
        dispatch(deleteAlbumThunk(albumId)).then(closeModal);
        setExist(false)
    }

    const cancelDelete = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
        {exist && (
            <>
            <div className="delete-modal">
              <h2 className="delete-album">Confirm Delete</h2>
              <div>Are you sure you want to remove this album?</div>
              <button className="yes-delete" onClick={confirmDelete}>
                Yes (Delete Album)
              </button>
              <button className="no-delete" onClick={cancelDelete}>
                No (Keep Album)
              </button>
            </div>
          </>
        )}
        </>
    )
}

export default DeleteAlbumModal;
