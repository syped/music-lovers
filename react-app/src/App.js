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
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [songList, setSongList] = useState([]);
  const [currentSong, setCurrentSong] = useState(0);

  useEffect(() => {
    dispatch(authenticate())
      .then(() => setIsLoaded(true))
      .then(() => setReload(false));
  }, [dispatch]);

  const handleList = (listData) => {
    setSongList(listData);
  };

  let song = songList[currentSong];

  if (!song || !song.mp3) song = { mp3: null };

  const handleSong = (songData) => {
    setCurrentSong(songData);
  };

  return (
    <>
      <Navigation reload={reload} isLoaded={isLoaded} />
      <AudioPlayer
        src={song.mp3 || null}
        volume={0.2}
        autoPlay
        onEnded={() => {
          if (currentSong < songList.length - 1) {
            setCurrentSong((i) => i + 1);
          } else {
            setCurrentSong(0);
          }
        }}
      />
      {/* <YourLibrary reload={reload} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage} />

          <Route path="/login" component={LoginFormPage} />

          <Route path="/signup" component={SignupFormPage} />

          <Route exact path="/songs">
            <SongPage selectedSong={handleSong} selectedList={handleList} />
          </Route>

          <Route path="/playlists/create">
            <CreatePlaylist reload={() => setReload(true)} />
          </Route>

          <Route path="/playlists/:playlistId/edit" component={EditPlaylist} />

          <Route path="/playlists/:playlistId">
            <SinglePlaylistPage
              selectedSong={handleSong}
              selectedList={handleList}
            />
          </Route>

          <Route path="/playlists" component={PlaylistPage} />

          <Route exact path="/albums/create">
            <CreateAlbum reload={() => setReload(true)} />
          </Route>

          <Route path="/albums/:albumId/edit" component={EditAlbum} />

          <Route path="/albums/:albumId">
            <SingleAlbumPage
              selectedSong={handleSong}
              selectedList={handleList}
            />
          </Route>

          <Route exact path="/albums" component={AlbumPage} />

          <Route>Page Not Found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
