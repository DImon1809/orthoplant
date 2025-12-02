import React from "react";

import OfficeSlide1 from "../../assets/OfficeSlide1.svg";
import AskewArrow from "../../assets/AskewArrow.svg";

import styles from "./style.module.scss";

type CardProps = {
  link: string;
};

const links = ["Профессиональные стоматологи", "Прайс лист"];

const CardLink = ({ link }: CardProps) => {
  return (
    <div className={styles.card__link}>
      <div className={styles.arrow__wrapper}>
        <img className={styles.arrow} src={AskewArrow} alt="#" />
      </div>
      <div className={styles.paragraph__wrapper}>
        <p className={styles.paragraph}>{link}</p>
      </div>
    </div>
  );
};

export const AboutUs = () => {
  return (
    <section className={styles.about__us}>
      <div className={styles.info}>
        <h3 className={styles.title}>О НАС</h3>
        <div className={styles.big__card}>
          <div>
            <h4 className={styles.title}>Наша миссия</h4>
          </div>
          <div>
            <p className={styles.paragraph}>
              помочь вам достичь{" "}
              <span className={styles.paragraph__gold}>
                здоровой, уверенной улыбки,
              </span>{" "}
              которая сохранится на всю жизнь
            </p>
          </div>
        </div>
        <div className={styles.cards__wrapper}>
          {links.map((link, index) => (
            <CardLink link={link} key={index} />
          ))}
        </div>
      </div>
      <div className={styles.office__slider}>
        <img src={OfficeSlide1} alt="#" />
      </div>
    </section>
  );
};
