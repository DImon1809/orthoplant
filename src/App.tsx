import React from "react";

import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";

import { MainPage } from "./pages/MainPage";
import { ServicePage } from "./pages/ServicePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { DoctorsList } from "./components/DoctorsList";

export const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/services/:serviceName" element={<ServicePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* <DoctorsList /> */}
    </>
  );
};
