import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAlbums } from "../../store/album";
import "./AlbumPage.css";

function AllPlaylists() {
  const dispatch = useDispatch();

  const allAlbumsObj = useSelector((state) => state.albums.allAlbums);
  const albumsArr = Object.values(allAlbumsObj);

  if (!albumsArr || !albumsArr.length) {
    dispatch(getAlbums());
    return null;
  }

  return (
    <div className="entire-playlists-container">
      <h1 className="all-playlists-header">All Albums</h1>
      <div className="idk-if-needed-div">
        <div className="main-playlist-card">
          {albumsArr.map((playlist) => (
            <NavLink
              className="playlists-navlink"
              to={`/playlists/${playlist.id}`}
            >
              <div className="playlist-card">
                <img className="playlist-card-img" src={playlist.album_image} />
                <div className="playlist-card-name-bio">
                  <p className="playlist-card-name">{playlist.album_name}</p>
                  <p className="playlist-card-bio">{playlist.release_year}</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPlaylists;

// import { useDispatch, useSelector } from "react-redux";
// import { getAlbums } from "../../store/album";
// import { useHistory } from "react-router-dom";
// import "./AlbumPage.css";

// function AllAlbums() {
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const allAlbumsObj = useSelector((state) => state.albums.allAlbums);

//   const arr = Object.values(allAlbumsObj);

//   if (!arr || !arr.length) {
//     dispatch(getAlbums());
//     return null;
//   }

//   const handleLoop = () => {
//     for (let i = 0; i < 5; i++) {
//       const album = arr[i];
//       console.log(album);
//       return (
//         <div
//           className="album-card"
//           onClick={() => {
//             history.push(`/albums/${album.id}`);
//           }}
//         >
//           <img className="album-page-img" src={album.album_image} />
//           <div className="solo-album-info-card">
//             <div className="album-page-name">{album.album_name}</div>
//             <div className="album-year">{album.release_year}</div>
//           </div>
//         </div>
//       );
//     }
//   };

//   const fiveAlbum = [];

//   for (let i = 0; i < arr.length; i++) {
//     const album = arr[i];
//     fiveAlbum.push(album)
//   }

//   return (
//     <>
//       <div className="album-body-card">
//         <div className="main-album-card">
//           {fiveAlbum.map((album) => (
//             // navlink to album details page
//             <div
//               className="album-card"
//               onClick={() => {
//                 history.push(`/albums/${album.id}`);
//               }}
//             >
//               <img className="album-page-img" src={album.album_image} />
//               <div className="solo-album-info-card">
//                 <div className="album-page-name">{album.album_name}</div>
//                 <div className="album-year">{album.release_year}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default AllAlbums;
