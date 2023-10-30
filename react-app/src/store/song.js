//ACTION TYPE
const GET_SONGS = "songs/GET_SONGS";
const GET_SINGLE_SONG = "songs/GET_SINGLE_SONG";
const CREATE_SONG = "songs/CREATE_SONG";
const UPDATE_SONG = "songs/UPDATE_SONG";
const DELETE_SONG = "songs/DELETE_SONG";

//ACTION CREATORS
const loadAllSongs = (songs) => ({
  type: GET_SONGS,
  songs,
});

const loadSingleSong = (song) => ({
  type: GET_SINGLE_SONG,
  song,
});

const createSong = (song) => ({
  type: CREATE_SONG,
  song,
});

const updateSong = (song) => ({
  type: UPDATE_SONG,
  song,
});

const deleteSong = (songId) => ({
  type: DELETE_SONG,
  songId,
});

//THUNKS
export const getSongsThunk = () => async (dispatch) => {
  const response = await fetch("/api/songs");

  if (response.ok) {
    const songs = await response.json();
    dispatch(loadAllSongs(songs));
    return songs;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const getSingleSongThunk = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`);

  if (response.ok) {
    const song = await response.json();
    dispatch(loadSingleSong(song));
    return song;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createSongThunk = (song) => async (dispatch) => {
  const response = await fetch(`/api/songs/create_song`, {
    method: "POST",
    // headers: {"Content-Type": "application/json"},
    body: song,
  });

  if (response.ok) {
    const newSong = await response.json();
    dispatch(createSong(newSong));
    return newSong;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const updateSongThunk = (song, songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`, {
    method: "PUT",
    // headers: { "Content-Type": "application/json" },
    body: song,
  });

  if (response.ok) {
    const updatedSong = await response.json();
    dispatch(updateSong(updatedSong));
    return updatedSong;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const deleteSongThunk = (songId) => async (dispatch) => {
  const response = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSong(songId));
  } else {
    const errors = await response.json();
    return errors;
  }
};

//REDUCER
const initialState = {
  allSongs: {},
  singleSong: {},
};

const songsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_SONGS:
      newState = { ...state };
      newState.allSongs = action.songs;
      return newState;
    case GET_SINGLE_SONG:
      newState = { ...state };
      newState.singleSong = action.song;
      return newState;
    case CREATE_SONG:
      newState = { ...state };
      newState.allSongs[action.song.id] = action.song;
      return newState;
    case UPDATE_SONG:
      newState = { ...state };
      // newState.allSongs[action.song.id] = action.song;
      newState.singleSong = action.song;
      return newState;
    case DELETE_SONG:
      newState = { ...state };
      delete newState.allSongs[action.songId];
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
