import { useEffect, useRef, useState, type JSX } from "react";

import { useNavigate } from "react-router-dom";

import Implant from "../../assets/Implant.svg";
import Stand from "../../assets/Stand.svg";

import Crown from "../../assets/Crown.svg";
import Orthodontics from "../../assets/Orthodontics.svg";
import ChildDentistry from "../../assets/ChildDentistry.svg";
import EsteticDentistry from "../../assets/EsteticDentistry.svg";
import Surgery from "../../assets/Surgery.svg";
import AllOn4 from "../../assets/AllOn4.webp";

import type { ServiceMap } from "../../hooks/useGetServiceInfo";

import styles from "./style.module.scss";

type CardItem = {
  title: string;
  Icon: JSX.Element;
  type: ServiceMap;
};

const cards: CardItem[][] = [
  [
    {
      title: "Протезирование",
      Icon: <img src={Crown} alt="#" />,
      type: "crown",
    },
    {
      title: "Ортодонтия",
      Icon: <img src={Orthodontics} alt="#" />,
      type: "orthodontics",
    },
  ],
  [
    {
      title: "Детская стоматология",
      Icon: <img src={ChildDentistry} alt="#" />,
      type: "childDentistry",
    },
    {
      title: "Эстетическая стоматология",
      Icon: <img src={EsteticDentistry} alt="#" />,
      type: "esteticDentistry",
    },
  ],
  [
    {
      title: "Хирургия и Пародонтология",
      Icon: <img src={Surgery} alt="#" />,
      type: "surgery",
    },
    {
      title: "ALL-ON-4",
      Icon: <img src={AllOn4} alt="#" className={styles.allOnFor} />,
      type: "allOn4",
    },
  ],
];

const Card = ({
  title,
  Icon,
  type,
  isLeft,
}: CardItem & {
  isLeft: boolean;
}) => {
  const navigate = useNavigate();

  const cardRef = useRef<HTMLDivElement>(null);

  const [moveCard, setMoveCard] = useState<boolean>(false);

  const handleScroll = () => {
    const reactCard = cardRef.current?.getBoundingClientRect();

    if (reactCard?.top && reactCard?.top > window.innerHeight && !moveCard)
      setMoveCard(false);

    if (reactCard?.top && reactCard?.top <= window.innerHeight && !moveCard)
      setMoveCard(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.card} ${isLeft ? styles.left : styles.right} ${moveCard ? styles.move : ""}`}
      onClick={() => navigate(`/services/${type}`)}
      ref={cardRef}
    >
      <div className={styles.info}>
        <h4
          className={`${styles.title} ${title === "Протезирование" || title === "Хирургия и Пародонтология" ? styles.little : ""}`}
        >
          {title}
        </h4>
      </div>
      <div
        className={`${styles.icon__wrapper} ${title === "Ортодонтия" ? styles.orthodontics : ""}`}
      >
        {Icon}
      </div>
    </div>
  );
};

export const OurServices = () => {
  const navigate = useNavigate();

  const bigCardLeftRef = useRef<HTMLDivElement>(null);
  const bigCardRightRef = useRef<HTMLDivElement>(null);

  const [moveBigCardLeft, setMoveBigCardLeft] = useState<boolean>(false);
  const [moveBigCardRight, setMoveBigCardRight] = useState<boolean>(false);

  const handleScroll = () => {
    const reactBigCard = bigCardLeftRef.current?.getBoundingClientRect();
    const rectSlider = bigCardRightRef.current?.getBoundingClientRect();

    if (
      reactBigCard?.top &&
      reactBigCard?.top > window.innerHeight &&
      !moveBigCardLeft
    )
      setMoveBigCardLeft(false);

    if (
      reactBigCard?.top &&
      reactBigCard?.top <= window.innerHeight &&
      !moveBigCardLeft
    )
      setMoveBigCardLeft(true);

    if (
      rectSlider?.top &&
      rectSlider?.top > window.innerHeight &&
      !moveBigCardRight
    )
      setMoveBigCardRight(false);

    if (
      rectSlider?.top &&
      rectSlider?.top <= window.innerHeight &&
      !moveBigCardRight
    )
      setMoveBigCardRight(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.our__services} id="our__services">
      <h3 className={styles.title}>НАШИ УСЛУГИ</h3>
      <div className={styles.cards__wrapper}>
        <div
          className={`${styles.big__card} ${styles.left} ${moveBigCardLeft ? styles.move : ""}`}
          onClick={() => navigate("/services/stand")}
          ref={bigCardLeftRef}
        >
          <div className={styles.info}>
            <h4 className={styles.title__stand}>ТЕРАПИЯ</h4>
            <ul className={styles.info__list}>
              <li>чистка зубов</li>
              <li>удаление зуба</li>
              <li>пломбирование зуба</li>
            </ul>
          </div>
          <div className={styles.stand__wrapper}>
            <img className={styles.stand} src={Stand} alt="#" />
          </div>
        </div>
        <div
          className={`${styles.big__card} ${styles.right} ${moveBigCardRight ? styles.move : ""}`}
          onClick={() => navigate("/services/implant")}
          ref={bigCardRightRef}
        >
          <div>
            <h4 className={styles.title__implant}>ИМПЛАНТАЦИЯ ЗУБА</h4>
          </div>
          <div>
            <img className={styles.implant} src={Implant} alt="#" />
          </div>
        </div>
      </div>
      <div className={styles.card__grid}>
        {cards.map((arr, index) => (
          <div className={styles.cards__array__wrapper} key={index}>
            <Card
              title={arr[0].title}
              Icon={arr[0].Icon}
              type={arr[0].type}
              isLeft={true}
            />
            <Card
              title={arr[1].title}
              Icon={arr[1].Icon}
              type={arr[1].type}
              isLeft={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
