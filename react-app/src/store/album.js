// ACTION TYPE
const GET_ALBUMS = "albums/GET_ALBUMS";
const GET_SINGLE_ALBUM = "albums/GET_SINGLE_ALBUM";
const CREATE_ALBUM = "albums/CREATE_ALBUM";

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
})

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
  }
};

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
      newState = { ...state};
      newState.allAlbums = action.album;
      return newState;
    default:
      return state;
  }
};

export default albumsReducer;
