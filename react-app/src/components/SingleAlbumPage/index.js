import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleAlbum } from "../../store/album";

function SingleAlbumPage() {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const singleAlbumObj = useSelector((state) => state.albums.singleAlbum);
  console.log(singleAlbumObj);

  useEffect(() => {
    dispatch(getSingleAlbum(albumId)).then(() => setIsLoaded(true));
  }, [dispatch, albumId]);

  //   if (singleAlbumObj.id !== parseInt(albumId)) return null;
  if (!singleAlbumObj || !singleAlbumObj.id) return null;

  return <>{isLoaded && <div>{singleAlbumObj.album_name}</div>}</>;
}

export default SingleAlbumPage;
