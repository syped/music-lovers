// //ACTION TYPE
// const LIKE_PLAYLIST = "playlists/LIKE_PLAYLIST";
// const UNLIKE_PLAYLIST = "playlists/UNLIKE_PLAYLIST";
// const TOGGLE_LIKE = "playlists/TOGGLE_PLAYLIST";
// const GET_LIKE = "playlists/GET_LIKE";

// //ACTION CREATORS
// export const likePlaylist = (playlistId, userId) => ({
//   type: LIKE_PLAYLIST,
//   playlistId,
//   userId,
// });

// export const unlikePlaylist = (payload) => ({
//   type: UNLIKE_PLAYLIST,
//   payload,
// });

// const toggleLike = (playlistId) => ({
//   type: TOGGLE_LIKE,
//   payload: { playlistId },
// });

// const getLike = (likes) => ({
//   type: GET_LIKE,
//   likes,
// });

// export const getLikeThunk = (playlistId) => async (dispatch) => {
//   const response = await fetch(`/api/playlists/${playlistId}/get-likes`);

//   if (response.ok) {
//     const likes = await response.json();
//     dispatch(getLike(likes));
//   }
// };

// export const likeThunk = (payload) => async (dispatch) => {
//   const response = await fetch(
//     `/api/playlists/${payload.playlistId}/edit-likes`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     }
//   );

//   if (response.ok) {
//     const addedLike = await response.json();
//     dispatch(likePlaylist(addedLike));
//   } else {
//     const errors = await response.json();
//     return errors;
//   }
// };

// export const unlikeThunk = (playlistId) => async (dispatch) => {
//   const response = await fetch(`/api/playlists/${playlistId}/edit-likes`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(playlistId),
//   });

//   if (response.ok) {
//     const res = await response.json();
//     dispatch(unlikePlaylist(res));
//   }
// };

// export const toggleThunk = (playlistId) => async (dispatch) => {
//   const response = await fetch(`/api/playlists/${playlistId}/edit-likes`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(playlistId),
//   });

//   if (response.ok) {
//     const res = await response.json();
//     dispatch(toggleLike(res));
//   }
// };

// // REDUCER
// const initialState = {
//   likes: {},
//   allLikes: {},
// };

// const likeReducer = (state = initialState, action) => {
//   let newState = {};
//   switch (action.type) {
//     case GET_LIKE:
//       newState = { ...state };
//       newState.likes = action.likes;
//       return newState;
//     case LIKE_PLAYLIST:
//       newState = { ...state };
//       const { playlistId, userId } = action;
//       if (newState.allPlaylists[playlistId]) {
//         newState.allLikes[playlistId].likes.push(playlistId);
//       }
//       return newState;
//     default:
//       return state;
//   }
//   // switch (action.type) {
//   //   case LIKE_PLAYLIST:
//   //     return {
//   //       ...state,
//   //       likedPlaylists: [...state.likedPlaylists, action.payload],
//   //     };
//   //   case UNLIKE_PLAYLIST:
//   //     return {
//   //       ...state,
//   //       likedPlaylists: state.likedPlaylists.filter(
//   //         (id) => id !== action.payload
//   //       ),
//   //     };
//   //   case GET_LIKE:
//   //     return {
//   //       ...state,
//   //       likedPlaylists: [...state.likedPlaylists, action.likes],
//   //     };
//   //   case TOGGLE_LIKE:
//   //     const { playlistId } = action.payload;
//   //     const currentLikeState = state.likes[playlistId] || false;
//   //     return {
//   //       ...state,
//   //       likes: {
//   //         ...state.likes,
//   //         [playlistId]: !currentLikeState,
//   //       },
//   //     };
//   //   default:
//   //     return state;
//   // }
// };

// export default likeReducer;
