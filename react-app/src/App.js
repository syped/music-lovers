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
      <YourLibrary />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/songs">
            <SongPage />
          </Route>
          <Route path="/playlists/create">
            <CreatePlaylist />
          </Route>
          <Route path="/playlist/:playlistId/edit">
            <EditPlaylist />
          </Route>
          <Route path="/playlists">
            <PlaylistPage />
          </Route>
          <Route path="/albums/create">
            <CreateAlbumSongForm />
          </Route>
          <Route path="/albums/:albumId/edit">
            <EditAlbum />
          </Route>
          <Route path="/albums/:albumId">
            <SingleAlbumPage />
          </Route>
          <Route path="/albums">
            <AlbumPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
