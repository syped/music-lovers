import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPlaylistsThunk } from "../../store/playlist";
import "./PlaylistPage.css";

function AllPlaylists() {
  const dispatch = useDispatch();

  const allPlaylistsObj = useSelector((state) => state.playlists.allPlaylists);
  const playlistArr = Object.values(allPlaylistsObj);

  if (!playlistArr || !playlistArr.length) {
    dispatch(getPlaylistsThunk());
    return null;
  }

  return (
    <div className="entire-playlists-container">
      <h1 className="all-playlists-header">All Playlists</h1>
      <div className="idk-if-needed-div">
        <div className="main-playlist-card">
          {playlistArr.map((playlist) => (
            <NavLink
              className="playlists-navlink"
              to={`/playlists/${playlist.id}`}
            >
              <div className="playlist-card">
                <img
                  className="playlist-card-img"
                  src={playlist.playlist_image}
                />
                <div className="playlist-card-name-bio">
                  <p className="playlist-card-name">{playlist.playlist_name}</p>
                  <p className="playlist-card-bio">{playlist.playlist_bio}</p>
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
// import {
//   getPlaylistsThunk,
//   addSongToPlaylistThunk,
// } from "../../store/playlist";
// import { likePlaylist, unlikePlaylist } from "../../store/likes";
// import { useState, useEffect } from "react";
// import { useModal } from "../../context/Modal";
// import { useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import "./PlaylistPage.css";

// function AllPlaylists() {
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const allPlaylistsObj = useSelector((state) => state.playlists.allPlaylists);
//   const [likeCounts, setLikeCounts] = useState({});
//   const likedPlaylists = useSelector((state) => state.likes.likedSongs);

//   const arr = Object.values(allPlaylistsObj);

//   useEffect(() => {
//     const savedLikeCounts = JSON.parse(localStorage.getItem("likeCounts"));
//     if (savedLikeCounts) {
//       setLikeCounts(savedLikeCounts);
//     }
//   }, []);

//   // const handleAddSong = () => {
//   //   dispatch(addSongToPlaylistThunk(playlistId, songId))
//   // }

//   const handleLikeClick = (playlistId) => {
//     const isLiked = likedPlaylists.includes(playlistId);
//     if (isLiked) {
//       dispatch(unlikePlaylist(playlistId));
//       setLikeCounts((prevCounts) => ({
//         ...prevCounts,
//         [playlistId]: (prevCounts[playlistId] || 0) - 1,
//       }));
//     } else {
//       dispatch(likePlaylist(playlistId));
//       setLikeCounts((prevCounts) => ({
//         ...prevCounts,
//         [playlistId]: (prevCounts[playlistId] || 0) + 1,
//       }));
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("likeCounts", JSON.stringify(likeCounts));
//   }, [likeCounts]);

//   if (!arr || !arr.length) {
//     dispatch(getPlaylistsThunk());
//     return null;
//   }

//   return (
//     <>
//       <div className="playlist-body-card">
//         <div className="main-playlist-card">
//           {arr.map((playlist) => (
//             <div className="playlist-card"
//             onClick={() => {
//               history.push(`/playlists/${playlist.id}`);
//             }}
//             >
//               <img
//                 className="playlist-page-img"
//                 src={playlist.playlist_image}
//               />
//               <div className="solo-playlist-info-card">
//                 <div className="playlist-page-name">
//                   {playlist.playlist_name}
//                 </div>
//                 {/* <div className="plalist-page-id">{playlist.user_id}</div> */}
//                 {/* change to user_id name */}
//                 {/* <div className="playlist-page-bio">{playlist.playlist_bio}</div> */}
//               </div>
//               {/* <button onClick={handleAddSong}>Add Song</button> */}
//               {/* <button onClick={() => handleLikeClick(playlist.id)}>
//               {likedPlaylists.includes(playlist.id) ? "Unlike" : "Like"}
//             </button> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default AllPlaylists;
