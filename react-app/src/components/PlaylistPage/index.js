import { useDispatch, useSelector } from "react-redux";
import { getPlaylistsThunk } from "../../store/playlist";

function AllPlaylists() {
    const dispatch = useDispatch();

    const allPlaylistsObj = useSelector((state) => state.playlists.allPlaylists);

    const arr = Object.values(allPlaylistsObj);

    if (!arr || !arr.length) {
        dispatch(getPlaylistsThunk());
        return null;
    }

    return (
        <>
            <div>
                {arr.map((playlist) => (
                    <div className="playlist-card">
                        <img src={playlist.playlist_image} />
                        <div>{playlist.playlist_name}</div>
                        <div>{playlist.user_id}</div> 
                        {/* change to user_id name */}
                        <div>{playlist.playlist_bio}</div>
                        <label class="switch">
                            <input type="checkbox" placeholder="public" />
                            <span class="slider"></span>
                        </label>
                        <div>{playlist.created_at}</div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default AllPlaylists;