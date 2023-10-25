// ACTION TYPE
const GET_PLAYLISTS = "playlists/GET_PLAYLISTS";
const GET_SINGLE_PLAYLIST = "playlists/GET_SINGLE_PLAYLIST";
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";
const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST";
const DELETE_PLAYLIST = "playlists/DELETE_PLAYLIST";

// ACTION CREATORS
const loadAllPlaylists = (playlists) => ({
    type: GET_PLAYLISTS,
    playlists,
});

const loadSinglePlaylist = (playlist) => ({
    type: GET_SINGLE_PLAYLIST,
    playlist,
});

const createPlaylist = (playlist) => ({
    type: CREATE_PLAYLIST,
    playlist,
});

const updatePlaylist = (playlist) => ({
    type: UPDATE_PLAYLIST,
    playlist,
});

const deletePlaylist = (playlistId) => ({
    type: DELETE_PLAYLIST,
    playlistId,
});

// THUNKS
export const getPlaylistsThunk = () => async (dispatch) => {
    const response = await fetch("/api/playlists");

    if (response.ok) {
        const playlists = await response.json();
        dispatch(loadAllPlaylists(playlists));
        return playlists;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const getSinglePlaylistThunk = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`);

    if (response.ok) {
        const playlist = await response.json();
        dispatch(loadSinglePlaylist(playlist));
        return playlist;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const createPlaylistThunk = (playlist) => async (dispatch) => {
    const response = await fetch(`/api/playlists/create_playlist`, {
        method: "POST",
        body: playlist,
    });

    if (response.ok) {
        const newPlaylist = await response.json();
        dispatch(createPlaylist(newPlaylist));
        return newPlaylist;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const updatePlaylistThunk = (playlist) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlist.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(playlist),
    });

    if(response.ok) {
        const updatedPlaylist = await response.json();
        dispatch(updatePlaylist(updatedPlaylist));
        return updatedPlaylist;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deletePlaylist(playlistId));
    } else {
        const errors = await response.json();
        return errors;
    }
};

//REDUCER
const initialState = {
    allPlaylists: {},
    singlePlaylist: {},
};

const playlistsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_PLAYLISTS:
            newState = { ...state };
            newState.allPlaylists = action.playlists;
            return newState;
        case GET_SINGLE_PLAYLIST:
            newState = { ...state };
            newState.singlePlaylist = action.playlist;
            return newState;
        case CREATE_PLAYLIST:
            newState = { ...state };
            newState.allPlaylists[action.playlist.id] = action.playlist;
            return newState;
        case UPDATE_PLAYLIST:
            newState = { ...state };
            newState.allPlaylists[action.playlist.id] = action.playlist;
            return newState;
        case DELETE_PLAYLIST:
            newState = { ...state };
            delete newState.allPlaylists[action.playlistId];
            return newState;
        default:
            return state;
    }
};

export default playlistsReducer;