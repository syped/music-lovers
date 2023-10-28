import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AlbumPage from "./components/AlbumPage";
import SongPage from "./components/SongPage";
import PlaylistPage from "./components/PlaylistPage";
import SingleAlbumPage from "./components/SingleAlbumPage";
import SinglePlaylistPage from "./components/SinglePlaylistPage";
import CreateAlbum from "./components/CreateAlbum";
import CreateSong from "./components/CreateSong";
import CreatePlaylist from "./components/CreatePlaylist";
import EditAlbum from "./components/EditAlbum";
// import EditSong from "./components/EditSong";
import EditPlaylist from "./components/EditPlaylist";
import LandingPage from "./components/LandingPage";
import YourLibrary from "./components/YourLibrary";
import CreateAlbumSongForm from "./components/CreateAlbumForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* <YourLibrary /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage} />

          <Route path="/login" component={LoginFormPage} />

          <Route path="/signup" component={SignupFormPage} />

          <Route exact path="/songs" component={SongPage} />

          <Route path="/playlists/create" component={CreatePlaylist} />

          <Route path="/playlists/:playlistId/edit" component={EditPlaylist} />

          <Route path="/playlists/:playlistId" component={SinglePlaylistPage} />

          <Route path="/playlists" component={PlaylistPage} />

          <Route exact path="/albums/create" component={CreateAlbum} />

          <Route path="/albums/:albumId/edit" component={EditAlbum} />

          <Route path="/albums/:albumId" component={SingleAlbumPage} />

          <Route exact path="/albums" component={AlbumPage} />

          <Route>Page Not Found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
