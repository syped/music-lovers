// ACTION TYPE
const GET_ALBUMS = "albums/GET_ALBUMS";
const GET_SINGLE_ALBUM = "albums/GET_SINGLE_ALBUM";
const CREATE_ALBUM = "albums/CREATE_ALBUM";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";

// ACTION CREATORS
const loadAllAlbums = (albums) => ({
  type: GET_ALBUMS,
  albums,
});

const loadSingleAlbum = (album) => ({
  type: GET_SINGLE_ALBUM,
  album,
});

const createAlbum = (album) => ({
  type: CREATE_ALBUM,
  album
});

const updateAlbum = (album) => ({
  type: UPDATE_ALBUM,
  album
})

const deleteAlbum = (albumId) => ({
  type: DELETE_ALBUM,
  albumId
});

//THUNKS
export const getAlbums = () => async (dispatch) => {
  const response = await fetch("/api/albums");

  if (response.ok) {
    const albums = await response.json();
    dispatch(loadAllAlbums(albums));
    return albums;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const getSingleAlbum = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`);

  if (response.ok) {
    const album = await response.json();
    dispatch(loadSingleAlbum(album));
    return album;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createAlbumThunk = (album) => async (dispatch) => {
  const response = await fetch(`/api/albums`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(album)
  });

  if (response.ok) {
    const newAlbum = await response.json();
    dispatch(createAlbum(newAlbum));
    return newAlbum;
  } else {
    const errors = await response.json();
    return errors;
  };
};

export const updateAlbumThunk = (album) => async (dispatch) => {
  const response = await fetch(`/api/albums/${album.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(album)
  })

  if (response.ok) {
    const updatedAlbum = await response.json();
    dispatch(updateAlbum(updatedAlbum));
    return updatedAlbum;
  } else {
    const errors = await response.json();
    return errors;
  }
}

export const deleteAlbumThunk = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteAlbum(albumId));
  } else {
    const errors = await response.json();
    return errors;
  };
}

//REDUCER

const initialState = {
  allAlbums: {},
  singleAlbum: {},
};

const albumsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALBUMS:
      newState = { ...state };
      newState.allAlbums = action.albums;
      return newState;
    case GET_SINGLE_ALBUM:
      newState = { ...state };
      newState.singleAlbum = action.album;
      return newState;
    case CREATE_ALBUM:
      newState = { ...state };
      newState.allAlbums[action.album.id] = action.album;
      return newState;
    case UPDATE_ALBUM:
      newState = { ...state };
      newState.allAlbums[action.album.id] = action.album;
      return newState;
    case DELETE_ALBUM:
      newState = { ...state };
      delete newState.allAlbums[action.albumId];
      return newState;
    default:
      return state;
  }
};

export default albumsReducer;
