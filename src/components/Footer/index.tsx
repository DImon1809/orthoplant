import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { FooterLine } from "../FooterLine";

import FooterLogo from "../../assets/FooterLogo.svg";

import styles from "./style.module.scss";

export const Footer = () => {
  const [isReverse, setIsReverse] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 810) {
        setIsReverse(true);

        return;
      }

      setIsReverse(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <FooterLine />
      <section className={styles.footer}>
        <div className={styles.columns__wrapper}>
          <div className={styles.column__one}>
            <img src={FooterLogo} alt="#" className={styles.footer__logo} />
          </div>

          {isReverse && (
            <div className={styles.column__four}>
              <div className={styles.button}>
                <span>Онлайн запись</span>
              </div>

              <a href={"tel:+79999999933"} className={styles.phone__link}>
                +7 (999) 999-99-33
              </a>
              <span className={styles.email}>orthoplant@gmail.com</span>
            </div>
          )}

          <div className={styles.column__two}>
            <div>
              <h3 className={styles.title}>услуги</h3>
              <ul className={styles.items}>
                <li className={styles.item}>
                  <Link to="/services/stand">Терапия</Link>
                </li>
                <li className={styles.item}>
                  <Link to="/services/orthodontics">Ортодонтия</Link>
                </li>
                <li className={styles.item}>
                  <Link to="/services/implant">Имплантация</Link>
                </li>
                <li className={styles.item}>
                  <Link to="/services/childDentistry">
                    Детская стоматология
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link to="/services/esteticDentistry">
                    Эстетическая стоматология
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link to="/services/surgery">Хирургия и Пародонтология</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.column__three}>
            <div>
              <h3 className={styles.title}>о нас</h3>
              <ul className={styles.items}>
                <li className={styles.item}>Лицензия</li>
                <li className={styles.item}>Локация</li>
                <li className={styles.item}>Врачи</li>
              </ul>
            </div>
          </div>

          {!isReverse && (
            <div className={styles.column__four}>
              <a href="#appointment" className={styles.button__wrapper}>
                <div className={styles.button}>
                  <span>Онлайн запись</span>
                </div>
              </a>

              <a href={"tel:+79999999933"} className={styles.phone__link}>
                +7 (999) 999-99-33
              </a>
              <span className={styles.email}>orthoplant@gmail.com</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
