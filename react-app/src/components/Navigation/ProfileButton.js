import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const heartIcon = process.env.PUBLIC_URL + "/FULLHEART.svg";

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
    <div className="profile-button-container">
      {user ? (
        <div className="logged-in-user">
          <button className="button-container" onClick={openMenu}>
            <ul>
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
            </ul>
          </button>
          <ul className={ulClassName} ref={ulRef}>
            {user && (
              <>
                <div className="user-info-button">
                  <li>{user.username}</li>
                  <li>{user.email}</li>
                  <li>
                    <button onClick={handleLogout}>Log Out</button>
                  </li>
                </div>
              </>
            )}
          </ul>
        </div>
      ) : (
        <>
          <OpenModalButton
            buttonText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </>
      )}
    </div>
  );
}

export default ProfileButton;
