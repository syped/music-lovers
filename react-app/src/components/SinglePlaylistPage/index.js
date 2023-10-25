import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePlaylistThunk } from "../../store/playlist";
import { getSongsThunk } from "../../store/song";
import OpenModalButton from "../OpenModalButton";
import AllSongsModal from "../AllSongsModal";

function SinglePlaylistPage() {
    const dispatch = useDispatch();
    const { playlistId } = useParams;
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    const allSongsObj = useSelector((state) => state.songs.allSongs);

    const singlePlaylistObj = useSelector((state) => state.playlists.singlePlaylist);

    const arr = Object.values(allSongsObj);

    useEffect(() => {
        dispatch(getSinglePlaylistThunk(playlistId)).then(() => setIsLoaded(true));
    }, [dispatch, playlistId]);

    if (!arr || !arr.length) {
        dispatch(getSongsThunk());
        return null;
    }

    if (!singlePlaylistObj || !singlePlaylistObj.id) return null;

    return (
        <>
        {isLoaded && (
            <div>
                <div>{singlePlaylistObj.playlist_name}</div>
                <div className="song-container">
                    <OpenModalButton
                    buttonText="Add Song"
                    modalComponent={
                        <AllSongsModal />
                    }
                    />
                </div>
            </div>
        )}
        </>
    )
}

export default SinglePlaylistPage;
