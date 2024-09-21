import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationForm.module.css";
import Footer from "../Footer/Footer";

export default function RegistrationForm({ onSubmit, registrationData }) {
  const [name, setName] = useState(registrationData?.name || "");
  const [dob, setDob] = useState(registrationData?.dob || "");
  const [email, setEmail] = useState(registrationData?.email || "");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();

    const today = new Date();
    const selectedDate = new Date(dob);

    if (selectedDate >= today) {
      setError("Date of birth must be a date from the past!");
      return;
    }

    const body = {
      email,
      name,
      dob,
    };

    try {
      await onSubmit(body);
      setTimeout(() => navigate("/registrations"), 300);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Email adress is already in use!");
      } else {
        setError("Something went wrong. You can try again.");
      }
    }
  }

  function handleCancel() {
    navigate("/registrations");
  }

  return (
    <div>
      <div className={styles.formContainer}>
        <form>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            minLength={3}
            maxLength={40}
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
          <br />
          <label htmlFor="dob">Date Of Birth</label>
          <br />
          <input
            type="date"
            id="dob"
            max={new Date().toISOString().split("T")[0]}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            minLength={8}
            maxLength={60}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button
            className={styles.submitBtn}
            type="submit"
            onClick={handleOnSubmit}
          >
            Submit
          </button>
          <button className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
