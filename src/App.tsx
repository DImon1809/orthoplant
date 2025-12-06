import React from "react";

import { Navbar } from "./components/Navbar";
import { MainSlider } from "./components/MainSlider";
import { AboutUs } from "./components/AboutAs";
import { OurServices } from "./components/OurServices";
import { DoctorsList } from "./components/DoctorsList";

export const App = () => {
  return (
    <>
      <Navbar />
      <MainSlider />
      <AboutUs />
      <OurServices />
      <DoctorsList />
    </>
  );
};
