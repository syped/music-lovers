import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleAlbum } from "../../store/album";
import OpenModalButton from "../OpenModalButton";
import { getSongsThunk } from "../../store/song";
import EditSong from "../EditSong";
import DeleteSong from "../DeleteSong";

function SingleAlbumPage() {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const allSongsObj = useSelector((state) => state.songs.allSongs);

  const singleAlbumObj = useSelector((state) => state.albums.singleAlbum);

  const arr = Object.values(allSongsObj);

  useEffect(() => {
    dispatch(getSingleAlbum(albumId)).then(() => setIsLoaded(true));
  }, [dispatch, albumId]);

  if (!arr || !arr.length) {
    dispatch(getSongsThunk());
    return null;
  }

  //   if (singleAlbumObj.id !== parseInt(albumId)) return null;
  if (!singleAlbumObj || !singleAlbumObj.id) return null;

  let albumsSongsArr;

  if (sessionUser.id === singleAlbumObj.user_id) {
    albumsSongsArr = arr.filter((song) => song.album_id === singleAlbumObj.id);
  }

  return (
    <>
      {isLoaded && (
        <div>
          <div>{singleAlbumObj.album_name}</div>
          <div>
            {sessionUser.id === singleAlbumObj.user_id
              ? albumsSongsArr.map((song) => (
                  <div className="song-edit-delete-container">
                    <div className="song-edit">
                      <OpenModalButton
                        buttonText="Edit"
                        modalComponent={
                          <EditSong albumId={albumId} song={song} />
                        }
                      />
                    </div>
                    <div className="song-delete">
                      <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteSong song={song} />}
                      />
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </>
  );
}

export default SingleAlbumPage;
