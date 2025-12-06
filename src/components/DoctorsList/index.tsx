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
  profession: string;
  experience: string;
  Icon: JSX.Element;
};

type DoctorCardProps = {
  doctor: Doctor;
};

const doctors: Doctor[] = [
  {
    firstName: "Халлуф",
    lastName: "Мохамад",
    surname: "Халил",
    profession: "Ортодонт",
    experience: "более 15 лет",
    Icon: <img src={Haluf} className={styles.icon} />,
  },
  {
    firstName: "Шикху",
    lastName: "Халид",
    profession: "Хирург-имплантолог",
    experience: "более 8 лет",
    Icon: <img src={Shikhu} className={styles.icon} />,
  },
  {
    firstName: "Тест",
    lastName: "Тестов",
    surname: "Тестович",
    profession: "Тест",
    experience: "2 года",
    Icon: <img src={Jenelia} className={styles.icon} />,
  },
  {
    firstName: "Тест",
    lastName: "Тестов",
    surname: "Тестович",
    profession: "Тест",
    experience: "2 года",
    Icon: <img src={Jagajeet} className={styles.icon} />,
  },
];

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className={styles.doctor__card}>
      <div className={styles.icon__wrapper}>{doctor.Icon}</div>
      <div>
        <h5
          className={styles.doctor__fio}
        >{`${doctor.firstName} ${doctor.lastName} ${doctor?.surname || ""}`}</h5>
        <div className={styles.info}>
          <p className={styles.profession}>{doctor.profession}</p>
          <p
            className={styles.experience}
          >{`Опыт работы: ${doctor.experience}`}</p>
        </div>
      </div>

      <div className={styles.doctor__button}>
        <span>Подробней о враче</span>
      </div>
    </div>
  );
};

export const DoctorsList = () => {
  return (
    <section className={styles.doctors__list}>
      <h3 className={styles.title}>ОПЫТНЫЕ ВРАЧИ</h3>
      <div className={styles.doctors__slider}>
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </section>
  );
};
