import reactDom from "react-dom";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import axios from "axios";
import styles from "./UpdateRegistrationsModal.module.css";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function UpdateRegistrationModal({
  registrationData,
  refetchData,
  onClose,
}) {
  async function updateRegistration(body) {
    try {
      await axios.put(
        API_HOST + `registrations/registrations/${registrationData._id}`,
        body
      );
      refetchData();
      onClose();
    } catch (error) {
      alert(error.message);
    }
  }

  return reactDom.createPortal(
    <>
      <div className={styles.modalOverlay}>
        <RegistrationForm
          registrationData={registrationData}
          onSubmit={updateRegistration}
        />
      </div>
    </>,
    document.body
  );
}
