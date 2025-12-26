import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

import logo from "../../assets/logo.webp";
import calendar from "../../assets/Calendar.webp";

import styles from "./style.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

type LogoProps = {
  className?: string;
  navigate: (arg: string) => void;
  setActive: Dispatch<SetStateAction<boolean>>;
};

type ItemProps = {
  item: {
    text: string;
    id?: string;
    isPage: boolean;
  };
  index: number;
  setActive: Dispatch<SetStateAction<boolean>>;
};

const Logo = ({ navigate, setActive, className }: LogoProps) => {
  return (
    <div className={`${className ? className : styles.logo__wrapper}`}>
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
  );
};

const Item = ({ item, index, setActive }: ItemProps) => {
  const [move, setMove] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setMove(true);
    }, index);
  }, [index]);

  return !item.isPage ? (
    <a
      href={item.id}
      className={styles.button__wrapper}
      onClick={() => setActive(false)}
    >
      <li className={`${styles.nav__button} ${move ? styles.move : ""}`}>
        {item.text}
      </li>
    </a>
  ) : (
    <li
      className={`${styles.nav__button} ${move ? styles.move : ""}`}
      onClick={() => setActive(false)}
    >
      {item.text}
    </li>
  );
};

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState<boolean>(false);

  const handleScroll = (): void => {
    if (active) setActive(false);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav className={styles.navbar}>
      <Logo navigate={navigate} setActive={setActive} />
      <div className={`${styles.buttons__wrapper} ${active && styles.active}`}>
        <Logo
          navigate={navigate}
          setActive={setActive}
          className={styles.logo__buttons}
        />

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
            {[
              { text: "О нас", id: "#about__us", isPage: false },
              { text: "Наши услуги", id: "#our__services", isPage: false },
              // {text: "Цены"},
              { text: "Локация", id: "#location", isPage: false },
              { text: "Лицензия", isPage: true },
            ].map((item, index) => (
              <Item
                item={item}
                index={index * 100 + 100}
                setActive={setActive}
              />
            ))}
          </ul>
        </div>

        <a href={"tel:+79999999933"} className={styles.phone__link}>
          +7 (999) 999-99-33
        </a>

        <a
          href="#appointment"
          className={styles.recording__wrapper}
          onClick={() => setActive(false)}
        >
          <div className={styles.recording__button}>
            <img src={calendar} alt="#" className={styles.calendar} />

            <span>Запись на приём</span>
          </div>
        </a>
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
