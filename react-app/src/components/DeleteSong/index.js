import { useState } from "react";
import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux"
import { deleteSongThunk } from "../../store/song"
import "./DeleteSong.css"

function DeleteSongModal ({ song }) {
    const dispatch = useDispatch();
    const [exist, setExist] = useState(true)
    const { closeModal } = useModal();

    const confirmDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSongThunk(song.id)).then(closeModal);
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
            <div className="delete-song-modal">
              <h2 className="delete-song">Confirm Delete</h2>
              <div>Are you sure you want to remove this song?</div>
              <button className="yes-delete-song" onClick={confirmDelete}>
                Yes (Delete Song)
              </button>
              <button className="no-delete-song" onClick={cancelDelete}>
                No (Keep Song)
              </button>
            </div>
          </>
        )}
        </>
    )
}

export default DeleteSongModal;
