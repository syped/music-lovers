//ACTION TYPE
const LIKE_PLAYLIST = "playlists/LIKE_PLAYLIST";
const UNLIKE_PLAYLIST = "playlists/UNLIKE_PLAYLIST";

//ACTION CREATORS
export const likeplaylist = (playlistId) => ({
  type: LIKE_PLAYLIST,
  payload: playlistId,
});

export const unlikeplaylist = (playlistId) => ({
  type: UNLIKE_PLAYLIST,
  payload: playlistId,
});

// REDUCER
const initialState = {
  likedPlaylists: [],
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIKE_PLAYLIST":
      return {
        ...state,
        likedPlaylists: [...state.likedPlaylists, action.payload],
      };
    case "UNLIKE_PLAYLIST":
      return {
        ...state,
        likedPlaylists: state.likedPlaylists.filter((id) => id !== action.payload),
      };
    default:
      return state;
  }
};

export default likeReducer;
