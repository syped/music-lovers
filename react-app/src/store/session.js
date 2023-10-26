// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USERS = "playlists/GET_USERS";
const GET_LIKE = "session/GET_LIKE";
const LIKE_PLAYLIST = "session/LIKE_PLAYLIST";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const loadAllUsers = (users) => ({
  type: GET_USERS,
  users,
});

const getLike = (likes) => ({
  type: GET_LIKE,
  likes,
});

const likePlaylist = (playlistId, userId) => ({
  type: LIKE_PLAYLIST,
  playlistId,
  userId,
});

const initialState = { user: null, allUsers: {}, userLikes: {} };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const getUsersThunk = () => async (dispatch) => {
  const response = await fetch("/api/users");

  if (response.ok) {
    const users = await response.json();
    dispatch(loadAllUsers(users));
    return users;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const getLikeThunk = (playlistId) => async (dispatch) => {
  const response = await fetch(`/api/users/${playlistId}/get-likes`);

  if (response.ok) {
    const likes = await response.json();
    dispatch(getLike(likes));
  }
};

export const likeThunk = (payload) => async (dispatch) => {
  const response = await fetch(`/api/users/${payload.playlist_id}/add-likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log("response");
    const addedLike = await response.json();
    dispatch(likePlaylist(addedLike));
  } else {
    console.log("not ok");
    const errors = await response.json();
    return errors;
  }
};

export default function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case GET_USERS:
      newState = { ...state };
      newState.allUsers = action.users;
    case GET_LIKE:
      newState = { ...state };
      newState.likes = action.likes;
      return newState;
    case LIKE_PLAYLIST:
      newState = { ...state };
      const { playlistId, userId } = action;
      console.log("test", playlistId.playlist_id, playlistId.user_id);
      //   if (newState.allUsers[userId]) {
      newState.allUsers[playlistId.user_id].likes.push(playlistId.playlist_id);
      //   }
      return newState;
    default:
      return state;
  }
}
