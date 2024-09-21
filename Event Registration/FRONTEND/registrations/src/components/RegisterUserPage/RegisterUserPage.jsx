import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterUserPage.module.css";
import Footer from "../Footer/Footer";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function RegisterUserPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const body = {
      username,
      password,
    };

    try {
      await axios.post(API_HOST + "users/register", body);
      setRegisterSuccessful(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("This username is already in use.");
      } else {
        setError(
          "An error occurred. Username and/or password is not valid. Please try again."
        );
      }
    }
  }

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleOnSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={3}
          maxLength={40}
          type="text"
          placeholder="Username"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={3}
          maxLength={40}
          type="password"
          placeholder="Password"
        />
        <br />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={3}
          maxLength={40}
          type="password"
          placeholder="Confirm Password"
        />
        <br />
        <button type="submit">REGISTER</button>
      </form>
      {registerSuccessful && (
        <p className={styles.successMessage}>REGISTRATION SUCCESSFUL</p>
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <Footer />
    </div>
  );
}
