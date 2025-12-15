import React, { useState } from "react";

import logo from "../../assets/logo.svg";
import calendar from "../../assets/Calendar.svg";

import styles from "./style.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState<boolean>(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo__wrapper}>
        <img
          src={logo}
          alt="#"
          onClick={() => {
            if (location.pathname !== "/") navigate("/");
            if (location.pathname === "/") window.scrollTo(0, 0);

            setActive(false);
          }}
        />
      </div>

      <div className={`${styles.buttons__wrapper} ${active && styles.active}`}>
        <div className={styles.nav__buttons__wrapper}>
          <span
            className={`${styles.nav__button} ${styles.main__button}`}
            onClick={() => {
              if (location.pathname !== "/") navigate("/");
              if (location.pathname === "/") window.scrollTo(0, 0);

              setActive(false);
            }}
          >
            Главная
          </span>
          <ul>
            <li className={styles.nav__button}>О нас</li>
            <li className={styles.nav__button}>Наши услуги</li>
            <li className={styles.nav__button}>Цены</li>
            <li className={styles.nav__button}>Локация</li>
            <li className={styles.nav__button}>Лицензия</li>
          </ul>
        </div>

        <div className={styles.recording__button}>
          <img src={calendar} alt="#" className={styles.calendar} />

          <span>Запись на приём</span>
        </div>
      </div>

      <div
        className={`${styles.burger} ${active && styles.active}`}
        onClick={() => {
          setActive((state) => !state);
        }}
      >
        <span className={styles.center__line}></span>
      </div>

      {active && (
        <div
          className={styles.global__wrapper}
          onClick={() => {
            setActive(false);
          }}
        ></div>
      )}
    </nav>
  );
};
