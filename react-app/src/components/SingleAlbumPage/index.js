import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleAlbum } from "../../store/album";

function SingleAlbumPage() {
    const { albumId } = useParams();

    const dispatch = useDispatch();

    const singleAlbumObj = useSelector((state) => state.albums.getSingleAlbum);

    useEffect(() => {
        dispatch(getSingleAlbum(albumId));
    }, [dispatch, albumId]);

    if(!singleAlbumObj.id) return null;

    return (
        <>
            <div>
                {singleAlbumObj.album_name}
            </div>
        </>
    )
}