import axios from "axios";
import UpdateRegistrationModal from "../UpdateRegistrationModal/UpdateRegistrationModal";
import { useState } from "react";
import styles from "./Registration.module.css";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function Registration({ registrationData, refetchData }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  async function handleDelete() {
    const confirmDelete = confirm(
      `Do you really want to delete acreditation of guest by name of ${registrationData.name} who was born on ${registrationData.dob} and registered with email adress ${registrationData.email}?`
    );
    console.log(registrationData);

    if (confirmDelete) {
      try {
        await axios.delete(
          API_HOST + `registrations/registrations/${registrationData._id}`
        );
        refetchData();
      } catch (error) {
        alert(error.message);
      }
    }
  }
  return (
    <>
      <tr className={styles.row}>
        <td>{registrationData.name}</td>
        <td>{registrationData.email}</td>
        <td>{registrationData.dob}</td>
        <td>
          <button onClick={() => setShowUpdateModal(true)}>🖉</button>
        </td>
        <td>
          <button onClick={handleDelete}>🗑️</button>
        </td>
      </tr>
      {showUpdateModal && (
        <UpdateRegistrationModal
          refetchData={refetchData}
          registrationData={registrationData}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </>
  );
}
