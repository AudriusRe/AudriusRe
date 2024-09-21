import { Route, Routes } from "react-router-dom";
import Registrations from "./Pages/Registrations/Registrations";
import NewRegistration from "./Pages/NewRegistration/NewRegistration";
import LoginUser from "./Pages/Login/Login";
import RegisterUser from "./Pages/RegisterUser/RegisterUser";

function App() {
  return (
    <Routes>
      <Route path="" element={<LoginUser />} />
      <Route path="/registeruser" element={<RegisterUser />} />
      <Route path="/registrations" element={<Registrations />} />
      <Route path="/registrations/new" element={<NewRegistration />} />
    </Routes>
  );
}

export default App;
