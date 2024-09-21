import axios from "axios";
import ReservationForm from "../../components/RegistrationForm/RegistrationForm";
import Navigation from "../../components/Navigation/Navigation";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function NewRegistration() {
  async function handleSubmit(body) {
    await axios.post(API_HOST + "registrations/registrations", body);
  }
  return (
    <div>
      <Navigation />
      <ReservationForm onSubmit={handleSubmit} />
    </div>
  );
}
