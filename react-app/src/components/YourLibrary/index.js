import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteAlbumModal from "../DeleteAlbumModal";
import { getAlbums } from "../../store/album";

function YourLibrary() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allAlbumsObj = useSelector((state) => state.albums.allAlbums);

  const arr = Object.values(allAlbumsObj);

  if (!arr || !arr.length) {
    dispatch(getAlbums());
    return null;
  }

  let userAlbumsArr;

  if (sessionUser) {
    userAlbumsArr = arr.filter((album) => album.user_id === sessionUser.id);
  }

  return (
    <>
      <h1>Your Library</h1>
      <button className="your-albums">Albums</button>
      <button className="your-playlists">Playlists</button>
      <div className="user-albums-container">
        {sessionUser &&
          userAlbumsArr.map((album) => (
            <div className="album-delete-button">
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteAlbumModal albumId={album.id} />}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default YourLibrary;
