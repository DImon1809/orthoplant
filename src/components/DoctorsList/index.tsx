import React from "react";
import type { JSX } from "react";

import Haluf from "../../assets/doctors/Haluf.svg";
import Shikhu from "../../assets/doctors/Shikhu.svg";
import Jenelia from "../../assets/doctors/Jenelia.svg";
import Jagajeet from "../../assets/doctors/Jagajeet.svg";

import styles from "./style.module.scss";

type Doctor = {
  firstName: string;
  lastName: string;
  surname?: string;
  experience: string;
  Icon: JSX.Element;
};

const doctors: Doctor[] = [
  {
    firstName: "Халлуф",
    lastName: "Мохамад",
    surname: "Халил",
    experience: "более 15 лет",
    Icon: <img src={Haluf} />,
  },
  {
    firstName: "Шикху",
    lastName: "Халид",
    experience: "более 8 лет",
    Icon: <img src={Shikhu} />,
  },
  {
    firstName: "Тест",
    lastName: "Тестов",
    surname: "Тестович",
    experience: "2 года",
    Icon: <img src={Jenelia} />,
  },
  {
    firstName: "Тест",
    lastName: "Тестов",
    surname: "Тестович",
    experience: "2 года",
    Icon: <img src={Jagajeet} />,
  },
];

const DoctorCard = ({}: Doctor) => {
  return <div></div>;
};

export const DoctorsList = () => {
  return (
    <section>
      <h3>ОПЫТНЫЕ ВРАЧИ</h3>
      <div className={styles.doctors__slider}>
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} />
        ))}
      </div>
    </section>
  );
};
