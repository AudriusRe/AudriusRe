import { useEffect, useState } from "react";
import axios from "axios";
import Registration from "../Registration/Registration";
import styles from "./RegistrationsContainer.module.css";
import Footer from "../Footer/Footer";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function RegistrationsContainer() {
  const [registrations, setRegistrations] = useState([]);

  function getRegistrations() {
    axios
      .get(API_HOST + "registrations/registrations")
      .then((response) => setRegistrations(response.data))
      // eslint-disable-next-line no-unused-vars
      .catch((error) => alert("Something went wrong"));
  }
  useEffect(() => {
    getRegistrations();
  }, []);

  return (
    <div className={styles.registrationsContainer}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date Of Birth</th>
            <th className={styles.shortTh}></th>
            <th className={styles.shortTh}></th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <Registration
              key={registration._id}
              registrationData={registration}
              refetchData={getRegistrations}
            />
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}
