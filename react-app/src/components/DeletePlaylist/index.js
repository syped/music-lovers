import { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deletePlaylistThunk } from "../../store/playlist";
import "./DeletePlaylist.css";

function DeletePlaylistModal ({ playlistId }) {
    const dispatch = useDispatch();
    const [exist, setExist] = useState(true);
    const { closeModal } = useModal();

    const confirmDelete = (e) => {
        e.preventDefault();
        dispatch(deletePlaylistThunk(playlistId)).then(closeModal);
        setExist(false)
    }

    const cancelDelete = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
        {exist && (
            <div className="delete-playlist-modal">
                <h2 className="delete-playlist">Confirm Delete</h2>
                <div>Are you sure you want to remove this Playlist?</div>
                <button className="yes-delete-playlist" onClick={confirmDelete}>
                  Yes (Delete Playlist)
                </button>
                <button className="no-delete-playlist" onClick={cancelDelete}>
                  No (Keep Playlist)
                </button>
            </div>
        )}
        </>
    )
}

export default DeletePlaylistModal;
