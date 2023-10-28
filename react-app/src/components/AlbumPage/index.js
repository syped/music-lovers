import { useDispatch, useSelector } from "react-redux";
import { getAlbums } from "../../store/album";
import { useHistory } from "react-router-dom";
import "./AlbumPage.css";

function AllAlbums() {
  const history = useHistory();
  const dispatch = useDispatch();

  const allAlbumsObj = useSelector((state) => state.albums.allAlbums);

  const arr = Object.values(allAlbumsObj);

  if (!arr || !arr.length) {
    dispatch(getAlbums());
    return null;
  }

  const handleLoop = () => {
    for (let i = 0; i < 5; i++) {
      const album = arr[i];
      console.log(album);
      return (
        <div
          className="album-card"
          onClick={() => {
            history.push(`/albums/${album.id}`);
          }}
        >
          <img className="album-page-img" src={album.album_image} />
          <div className="solo-album-info-card">
            <div className="album-page-name">{album.album_name}</div>
            <div className="album-year">{album.release_year}</div>
          </div>
        </div>
      );
    }
  };

  const fiveAlbum = [];

  for (let i = 0; i < arr.length; i++) {
    const album = arr[i];
    fiveAlbum.push(album)
  }


  return (
    <>
      <div className="album-body-card">
        <div className="main-album-card">
          {fiveAlbum.map((album) => (
            // navlink to album details page
            <div
              className="album-card"
              onClick={() => {
                history.push(`/albums/${album.id}`);
              }}
            >
              <img className="album-page-img" src={album.album_image} />
              <div className="solo-album-info-card">
                <div className="album-page-name">{album.album_name}</div>
                <div className="album-year">{album.release_year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllAlbums;
