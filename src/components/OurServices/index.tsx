import type { JSX } from "react";

import Implant from "../../assets/Implant.svg";
import Stand from "../../assets/Stand.svg";

import Crown from "../../assets/Crown.svg";
import Orthodontics from "../../assets/Orthodontics.svg";
import ChildDentistry from "../../assets/ChildDentistry.svg";
import EsteticDentistry from "../../assets/EsteticDentistry.svg";
import Surgery from "../../assets/Surgery.svg";
import AllOn4 from "../../assets/AllOn4.svg";

import styles from "./style.module.scss";

type CardItem = {
  title: string;
  Icon: JSX.Element;
};

const cards: CardItem[][] = [
  [
    {
      title: "Протезирование",
      Icon: <img src={Crown} alt="#" />,
    },
    {
      title: "Ортодонтия",
      Icon: <img src={Orthodontics} alt="#" />,
    },
  ],
  [
    {
      title: "Детская стоматология",
      Icon: <img src={ChildDentistry} alt="#" />,
    },
    {
      title: "Эстетическая стоматология",
      Icon: <img src={EsteticDentistry} alt="#" />,
    },
  ],
  [
    {
      title: "Хирургия и Пародонтология",
      Icon: <img src={Surgery} alt="#" />,
    },
    {
      title: "ALL-ON-4",
      Icon: <img src={AllOn4} alt="#" className={styles.icon} />,
    },
  ],
];

const Card = ({ title, Icon }: CardItem) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
      </div>
      <div className={styles.icon__wrapper}>{Icon}</div>
    </div>
  );
};

export const OurServices = () => {
  return (
    <section className={styles.our__services}>
      <h3 className={styles.title}>НАШИ УСЛУГИ</h3>
      <div className={styles.cards__wrapper}>
        <div className={styles.big__card}>
          <div className={styles.info}>
            <h4 className={styles.title__stand}>ТЕРАПИЯ</h4>
            <ul className={styles.info__list}>
              <li>чистка зубов</li>
              <li>удаление зуба</li>
              <li>пломбирование зуба</li>
            </ul>
          </div>
          <div>
            <img className={styles.stand} src={Stand} alt="#" />
          </div>
        </div>
        <div className={styles.big__card}>
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
            <Card title={arr[0].title} Icon={arr[0].Icon} />
            <Card title={arr[1].title} Icon={arr[1].Icon} />
          </div>
        ))}
      </div>
    </section>
  );
};
