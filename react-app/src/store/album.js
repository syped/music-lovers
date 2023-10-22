const GET_ALBUMS = "albums/GET_ALBUMS";

const loadAllAlbums = (albums) => ({
  type: GET_ALBUMS,
  albums,
});

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
    default:
      return state;
  }
};

export default albumsReducer;
