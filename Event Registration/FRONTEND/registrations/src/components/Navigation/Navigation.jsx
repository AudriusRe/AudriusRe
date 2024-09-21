import { useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const navigate = useNavigate();

  function handleRegistrations() {
    navigate("/registrations");
  }

  function handleNewRegistration() {
    navigate("/registrations/new");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className={styles.header}>
      <button onClick={handleRegistrations}>CURRENT REGISTRATIONS</button>
      <button onClick={handleNewRegistration}>NEW GUEST REGISTRATION</button>
      <button className={styles.logOutBtn} onClick={handleLogout}>
        LOG OUT
      </button>
    </div>
  );
}
