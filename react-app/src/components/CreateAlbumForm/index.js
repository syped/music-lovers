import { useState } from "react";
import CreateAlbumForm from "../CreateAlbum";
import CreateSongForm from "../CreateSong";

function CreateAlbumSongForm() {
  const [dataFromAlbum, setDataFromAlbum] = useState(null);
  const [songSubmitted, setSongSubmitted] = useState(false);

  return (
    <div>
      <CreateAlbumForm
        canSubmitAlbum={songSubmitted}
        onAlbumSubmit={(data) => setDataFromAlbum(data)}
      />
      <CreateSongForm
        onSongSubmit={() => setSongSubmitted(true)}
        dataFromAlbum={dataFromAlbum}
      />
    </div>
  );
}

export default CreateAlbumSongForm;
