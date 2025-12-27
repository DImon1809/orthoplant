import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import logo from "../../assets/logo.webp";
import calendar from "../../assets/Calendar.webp";

import styles from "./style.module.scss";

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
  isAnother: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  navigate: (arg: string) => void;
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

const Item = ({ item, index, setActive, navigate, isAnother }: ItemProps) => {
  const [move, setMove] = useState<boolean>(false);

  const handleClick = () => {
    setActive(false);

    if (!item.isPage && isAnother && item?.id) {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(`${item.id}`);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 1000);

      return;
    }

    if (!item.isPage && !isAnother && item?.id) {
      const element = document.querySelector(`${item.id}`);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMove(true);
    }, index);
  }, [index]);

  return (
    <li
      className={`${styles.nav__button} ${move ? styles.move : ""}`}
      onClick={handleClick}
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
                navigate={navigate}
                isAnother={location.pathname !== "/"}
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
