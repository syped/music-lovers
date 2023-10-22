import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { getAlbums } from '../../store/album';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';

function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const allAlbumsObj = useSelector((state) => state.albums.AllAlbums)

	const arr = Object.values(allAlbumsObj);

	if (!arr || !arr.length) {
		dispatch(getAlbums());
		return null;
	}

	const userAlbumsArr = arr.filter((album) => album.user_id === sessionUser.id)

	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			<div className="user-albums-container">
				{userAlbumsArr.map((album) => (
					<button className="album-delete-button">
						<OpenModalButton 
							buttonText="Delete" 
							modalComponent={<DeleteAlbumModal album={album} />}
						/>
					</button>
				))}
			</div>
		</ul>
	);
}

export default Navigation;