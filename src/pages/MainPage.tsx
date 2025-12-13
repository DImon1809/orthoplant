import { MainSlider } from "../components/MainSlider";
import { OurServices } from "../components/OurServices";
import { AboutUs } from "../components/AboutAs";
import { DoctorsList } from "../components/DoctorsList";

export const MainPage = () => {
  return (
    <>
      <MainSlider />
      <AboutUs />
      <OurServices />
      <DoctorsList />
    </>
  );
};
