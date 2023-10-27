import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="top-section">
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
        </li>
      </div>
      {isLoaded && (
        <li className="pb-container">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </div>
  );
}

export default Navigation;
