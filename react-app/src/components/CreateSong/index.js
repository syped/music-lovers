import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSongThunk } from "../../store/song";

function CreateSongForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id);
    // const albumId = useSelector((state) => state.songs.)

    const [name, setName] = useState("");
    const [length, setLength] = useState("");
    const [mp3, setMp3] = useState("");
    const [errors, setErrors] = useState({});

    function errorsChecked(name, length, mp3) {
        const errors = {};
        if (!name) errors.name = "Song name is required";
        if (!length) errors.length = "Length of the song is required";
        if (!mp3) errors.mp3 = "Mp3 file is required";
    
        setErrors(errors);
    
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsFound = errorsChecked(name, length, mp3);

        const newSong = {
            user_id: userId,
            album_id: 1,
            song_name: name,
            length: length,
            mp3: mp3
        };

        if (Object.keys(errorsFound).length === 0) {
            const response = await dispatch(createSongThunk(newSong));

            if (response.ok) {
                history.push(`/songs/${response.id}`);
            }
        }
    };

    return (
        <>
            <div className="create-song-form">
                <h1>Upload your Song(s)</h1>
                <form onSubmit={handleSubmit}>
                    <div className="song-form-fields">
                        <label>
                            Song Name:
                            <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Song Name"
                            />
                        </label>
                        {errors.name && <p className="errors">{errors.name}</p>}
                    </div>
                    <div className="song-form-fields">
                        <label>
                            Length: 
                            <input
                            type="text"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            placeholder="Length of Song"
                            />
                        </label>
                        {errors.name && <p className="errors">{errors.length}</p>}
                    </div>
                    <div className="song-form-fields">
                        <label>
                            Song File: 
                            <input
                            type="text"
                            value={mp3}
                            onChange={(e) => setMp3(e.target.value)}
                            placeholder="Song File"
                            />
                        </label>
                        {errors.name && <p className="errors">{errors.mp3}</p>}
                    </div>
                    <button type="submit">Upload Song</button>
                </form>
            </div>
        </>
    )
};

export default CreateSongForm;