import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const heartIcon = process.env.PUBLIC_URL + "/images/FULLHEART.svg";

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-button-wrapper">
      <div className="profile-button-container">
        {user ? (
          <div className="logged-in-user">
            <button className="user-button" onClick={openMenu}>
              {user ? (
                <div className="heart-profile-icon">
                  <img src={heartIcon} alt="Heart" className="heart-profile" />
                  <span className="user-initial">{user.first_name[0]}</span>
                </div>
              ) : (
                <div className="circle-profile-icon">
                  <i className="fas fa-user-circle" />
                </div>
              )}
            </button>
            <ul className={ulClassName} ref={ulRef}>
              {user && (
                <>
                  <div className="user-info-button">
                    <li className="pb-username">{user.username}</li>
                    <li className="pb-name">
                      {user.first_name} {user.last_name}
                    </li>
                    <li className="pb-email">{user.email}</li>
                    <li className="pb-logout">
                      <button onClick={handleLogout}>Log Out</button>
                    </li>
                  </div>
                </>
              )}
            </ul>
          </div>
        ) : (
          <div className="login-signup-menu">
            <div className="signup-button">
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
            <div className="login-button">
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
