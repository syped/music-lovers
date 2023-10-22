import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../store/album";

function AllAlbums() {
  const dispatch = useDispatch();

  const allAlbumsObj = useSelector((state) => state.albums.allAlbums);

  const arr = Object.values(allAlbumsObj);

  if (!arr || !arr.length) {
    dispatch(getAlbums());
    return null;
  }

  return (
    <>
      <div>
        {arr.map((album) => (
          // navlink to album details page
          <div className="album-card">
            <div>{album.album_name}</div>
            <div>{album.release_year}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllAlbums;
