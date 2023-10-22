import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createAlbumThunk } from '../../store/album';

export const createAlbumForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [errors, setErrors] = useState({});

    function errorsChecked (
        name,
        releaseYear
    ) {
        const errors = {};
        if (!name) errors.name = 'Album name is required';
        if (!releaseYear) errors.releaseYear = 'Release year is required';

        setErrors(errors);

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorsFound = errorsChecked (
            name,
            releaseYear
        );

        if (Object.keys(errorsFound).length === 0) {
            const response = {
                name,
                releaseYear
            };

            const newAlbum = await dispatch(createAlbumThunk(response));

            if (newAlbum) {
                dispatch(createAlbumThunk(newAlbum.id));
                history.push(`/spot/${newAlbum.id}`);
            }
        }
    };

    return (
        <>
        <div className='form-container'>
            <h1>Upload your favorite Enhypen Album</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='form-fields'>
                <label>
                    Album
                    <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Album Name'/>
                </label>
                {errors.name && <p className='errors'>{errors.name}</p>}
            </div>
        </form>

        </>
    )
}
