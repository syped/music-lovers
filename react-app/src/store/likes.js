//ACTION TYPE
const LIKE_PLAYLIST = "playlists/LIKE_PLAYLIST";
const UNLIKE_PLAYLIST = "playlists/UNLIKE_PLAYLIST";

//ACTION CREATORS
const likePlaylist = (payload) => ({
  type: LIKE_PLAYLIST,
  payload,
});

const unlikePlaylist = (payload) => ({
  type: UNLIKE_PLAYLIST,
  payload,
});

//THUNKS
export const likePlaylistThunk = (payload) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${payload.playlist_id}}/liked`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const res = await response.json();
    if (res.liked) {
      dispatch(likePlaylist(payload.playlist_id));
    } else {
      dispatch(unlikePlaylist(payload.playlist_id));
    }
  } else {
    const errors = await response.json();
    return errors;
  }
};

// REDUCER
const initialState = {
  likedPlaylists: [],
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_PLAYLIST:
      return {
        ...state,
        likedPlaylists: [...state.likedPlaylists, action.playlistId],
      };
    case UNLIKE_PLAYLIST:
      return {
        ...state,
        likedPlaylists: state.likedPlaylists.filter(
          (id) => id !== action.playlistId
        ),
      };
    default:
      return state;
  }
};

export default likeReducer;
