import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Navbar } from "./components/Navbar";

import { MainPage } from "./pages/MainPage";
import { ServicePage } from "./pages/ServicePage";
import { LicensiaPage } from "./pages/LicensiaPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { DoctorsList } from "./components/DoctorsList";
import { Footer } from "./components/Footer";
import { MakeAnAppointment } from "./components/MakeAnAppointment";

const Root = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/services/:serviceName" element={<ServicePage />} />
        <Route path="/licensia" element={<LicensiaPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <DoctorsList />
      <MakeAnAppointment />
      <Footer />
    </>
  );
};

export const App = () => {
  return (
    <>
      <ToastContainer />
      <Root />
    </>
  );
};
