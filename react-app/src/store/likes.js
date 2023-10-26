//ACTION TYPE
const LIKE_PLAYLIST = "playlists/LIKE_PLAYLIST";
const UNLIKE_PLAYLIST = "playlists/UNLIKE_PLAYLIST";
const TOGGLE_LIKE = "playlists/TOGGLE_PLAYLIST";
const GET_LIKE = "playlists/GET_LIKE";

//ACTION CREATORS
export const likePlaylist = (payload) => ({
  type: LIKE_PLAYLIST,
  payload,
});

export const unlikePlaylist = (payload) => ({
  type: UNLIKE_PLAYLIST,
  payload,
});

const toggleLike = (playlistId) => ({
  type: TOGGLE_LIKE,
  payload: { playlistId },
});

const getLike = (likes) => ({
  type: GET_LIKE,
  likes,
});

export const getLikeThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}/get-likes`);

  if (response.ok) {
    const res = await response.json();
    dispatch(getLike(res));
  }
};

export const likeThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}/edit-likes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playlistId),
  });

  if (response.ok) {
    const res = await response.json();
    dispatch(likePlaylist(res));
  }
};

export const unlikeThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}/edit-likes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playlistId),
  });

  if (response.ok) {
    const res = await response.json();
    dispatch(unlikePlaylist(res));
  }
};

export const toggleThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlistId}/edit-likes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playlistId),
  });

  if (response.ok) {
    const res = await response.json();
    dispatch(toggleLike(res));
  }
};

// REDUCER
const initialState = {
  likedPlaylists: [],
  likes: {},
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_PLAYLIST:
      return {
        ...state,
        likedPlaylists: [...state.likedPlaylists, action.payload],
      };
    case UNLIKE_PLAYLIST:
      return {
        ...state,
        likedPlaylists: state.likedPlaylists.filter(
          (id) => id !== action.payload
        ),
      };
    case GET_LIKE:
      return {
        ...state,
        likedPlaylists: [...state.likedPlaylists, action.likes],
      };
    case TOGGLE_LIKE:
      const { playlistId } = action.payload;
      const currentLikeState = state.likes[playlistId] || false;
      return {
        ...state,
        likes: {
          ...state.likes,
          [playlistId]: !currentLikeState,
        },
      };
    default:
      return state;
  }
};

export default likeReducer;
