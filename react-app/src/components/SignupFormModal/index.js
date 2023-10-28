import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (password === confirmPassword) {
      try {
        const data = await dispatch(
          signUp(username, firstName, lastName, email, password)
        );
        if (data.errors) {
          setErrors(data.errors);
        } else {
          closeModal();
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  useEffect(() => {
    const errors = {};

    if (!username) errors.username = "Username is required";
    if (username.length < 3)
      errors.username = "Username must be at least 3 characters";
    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!confirmPassword) errors.confirmPassword = "Must confirm password";

    setValidationErrors(errors);
  }, [username, firstName, lastName, email, password, confirmPassword]);

  const handleClose = () => {
    closeModal();
  };

  const isButtonDisabled = () => {
    return (
      !email ||
      !username ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      password.length < 6 ||
      // confirmPassword !== password ||
      username.length < 4
    );
  };

  return (
    <div className="entire-signup">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <div className="signup-header">Sign up to start listening</div>
      <div className="signup-inputs">
        <form onSubmit={handleSubmit}>
          {/* <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul> */}
          <div className="signup-email">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {hasSubmitted && validationErrors.email && (
            <div className="signup-errors">{validationErrors.email}</div>
          )}
          <div className="signup-username">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {hasSubmitted && validationErrors.username && (
            <div className="signup-errors">{validationErrors.username}</div>
          )}
          <div className="signup-firstname">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          {hasSubmitted && validationErrors.firstName && (
            <div className="signup-errors">{validationErrors.firstName}</div>
          )}
          <div className="signup-lastname">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          {hasSubmitted && validationErrors.lastName && (
            <div className="signup-errors">{validationErrors.lastName}</div>
          )}
          <div className="signup-password">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {hasSubmitted && validationErrors.password && (
            <div className="signup-errors">{validationErrors.password}</div>
          )}
          <div className="signup-confirm">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {hasSubmitted && validationErrors.confirmPassword && (
            <div className="signup-errors">
              {validationErrors.confirmPassword}
            </div>
          )}
          <div className="signup-submit-button">
            <button
              className="signup-button"
              disabled={
                !firstName ||
                !lastName ||
                !email ||
                !username ||
                !password ||
                !confirmPassword ||
                username.length < 4 ||
                password.length < 6
              }
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
