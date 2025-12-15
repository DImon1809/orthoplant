import { useEffect } from "react";

import { MainSlider } from "../components/MainSlider";
import { OurServices } from "../components/OurServices";
import { AboutUs } from "../components/AboutAs";

export const MainPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MainSlider />
      <AboutUs />
      <OurServices />
    </>
  );
};
