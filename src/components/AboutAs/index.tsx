import { useEffect, useMemo, useRef, useState } from "react";

import OfficeSlide1 from "../../assets/OfficeSlide1.svg";
import AskewArrow from "../../assets/AskewArrow.svg";

import { useIsMobile } from "../../hooks/useIsMobule";

import styles from "./style.module.scss";

type CardProps = {
  link: string;
  index: number;
  isMove: boolean;
};

const CardLink = ({ link, index, isMove }: CardProps) => {
  const [cardMove, setCardMove] = useState<boolean>(false);

  useEffect(() => {
    if (isMove) {
      setTimeout(() => {
        setCardMove(true);
      }, 300);
    }
  }, [isMove]);

  return (
    <div
      className={`${styles.card__link} ${index ? styles.step__right : styles.step__left} ${cardMove ? styles.move : ""}`}
    >
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
  const { isMobile } = useIsMobile();

  const infoRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [moveInfo, setMoveInfo] = useState<boolean>(false);
  const [moveSlider, setMoveSlider] = useState<boolean>(false);

  const links = useMemo(
    () => [
      isMobile ? "Специалисты" : "Профессиональные стоматологи",
      "ЦЕНЫ ЗА УСЛУГИ",
    ],
    [isMobile]
  );

  const handleScroll = () => {
    const rectInfo = infoRef.current?.getBoundingClientRect();
    const rectSlider = sliderRef.current?.getBoundingClientRect();

    if (rectInfo?.top && rectInfo?.top > window.innerHeight && !moveInfo)
      setMoveInfo(false);

    if (rectInfo?.top && rectInfo?.top <= window.innerHeight && !moveInfo)
      setMoveInfo(true);

    if (rectSlider?.top && rectSlider?.top > window.innerHeight && !moveSlider)
      setMoveSlider(false);

    if (rectSlider?.top && rectSlider?.top <= window.innerHeight && !moveSlider)
      setMoveSlider(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.about__us} id="about__us">
      <div
        className={`${styles.info} ${moveInfo ? styles.move : ""}`}
        ref={infoRef}
      >
        <h3 className={styles.title}>О НАС</h3>
        <div className={styles.big__card}>
          <div>
            <h4 className={styles.card__title}>Наша миссия</h4>
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
            <CardLink link={link} key={index} index={index} isMove={moveInfo} />
          ))}
        </div>
      </div>
      <div
        className={`${styles.office__slider} ${moveSlider ? styles.move : ""}`}
        ref={sliderRef}
      >
        <img src={OfficeSlide1} alt="#" className={styles.slide} />
      </div>
    </section>
  );
};
