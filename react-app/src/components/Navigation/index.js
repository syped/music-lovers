import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import YourLibrary from "../YourLibrary";

import "./Navigation.css";

function Navigation({ isLoaded, reload }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="page-grid">
      <div className="logo-container">
        <li className="nav-container">
          <NavLink exact to="/">
            <img
              src={process.env.PUBLIC_URL + "/images/ML_LOGO.png"}
              alt="ML LOGO"
              className="logo"
            ></img>
          </NavLink>
          <NavLink exact to="/songs" className="nav-links">
            Songs
          </NavLink>
          <NavLink exact to="/albums" className="nav-links">
            Albums
          </NavLink>
          <NavLink exact to="/playlists" className="nav-links">
            Playlists
          </NavLink>
          <a
            href="https://github.com/syped/music-lovers/wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            About Us
          </a>
        </li>
      </div>
      <div className="profile-button-cont">
        {isLoaded && (
          <div className="pb-container">
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
      <div className="your-library-cont">
        <YourLibrary reload={reload} />
      </div>
    </div>
  );
}

export default Navigation;
