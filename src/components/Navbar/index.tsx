import React from "react";

import logo from "../../assets/logo.svg";
import calendar from "../../assets/Calendar.svg";

import styles from "./style.module.scss";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo__wrapper}>
        <img src={logo} alt="#" />
      </div>

      <div className={styles.buttons__wrapper}>
        <ul>
          <li className={styles.nav__button}>Главная</li>
          <li className={styles.nav__button}>О нас</li>
          <li className={styles.nav__button}>Наши услуги</li>
          <li className={styles.nav__button}>Лицензия</li>
          <li className={styles.nav__button}>Локация</li>
        </ul>
      </div>

      <div className={styles.recording__button}>
        <img src={calendar} alt="#" />

        <span>Запись на приём</span>
      </div>
    </nav>
  );
};
