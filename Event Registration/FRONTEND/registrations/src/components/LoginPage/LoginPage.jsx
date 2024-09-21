import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import Footer from "../Footer/Footer";

const API_HOST = import.meta.env.VITE_API_HOST;
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/registrations");
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    try {
      const response = await axios.post(API_HOST + "users/login", body);
      localStorage.setItem("token", response.data.token);
      navigate("/registrations");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Wrong username or password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  }

  function handleRegisterNewUser() {
    navigate("/registeruser");
  }

  return (
    <div className={styles.loginForm}>
      <h2>SUPER DUPER EVENTS</h2>
      <h3>GUESTS MANAGEMENT SYSTEM</h3>
      <form onSubmit={handleLogin}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />{" "}
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />{" "}
        <br />
        <button type="submit">LOGIN</button>
        <button onClick={handleRegisterNewUser}>NEW USER</button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <Footer />
    </div>
  );
}
