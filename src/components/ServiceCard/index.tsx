import type { Item } from "../../hooks/useGetServiceInfo";

import styles from "./style.module.scss";
import { checkLogoInTitle } from "../../utils/checkLogoInTitle";
import { useEffect, useRef, useState } from "react";

type CardProps = {
  item: Item["item"];
  isSplit?: boolean;
  isLeft?: boolean;
};

type ServiceCardProps = {
  item: Item;
  index: number;
};

const Card = ({ item, isSplit, isLeft }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [moveCard, setMoveCard] = useState<boolean>(false);

  const handleScroll = () => {
    const rectInfo = cardRef.current?.getBoundingClientRect();

    if (rectInfo?.top && rectInfo?.top > window.innerHeight && !moveCard)
      setMoveCard(false);

    if (rectInfo?.top && rectInfo?.top <= window.innerHeight && !moveCard)
      setMoveCard(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.service__card} ${isSplit ? styles.split : ""} ${isLeft ? styles.left : styles.right} ${moveCard ? styles.move : ""}`}
      ref={cardRef}
    >
      {typeof item === "string" && (
        <div className={styles.text}>{`${item}`}</div>
      )}

      {Array.isArray(item) && (
        <ul className={styles.items}>
          {item.map((label, key) => (
            <li key={key} className={styles.item}>
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const ServiceCard = ({ item, index }: ServiceCardProps) => {
  return (
    <div className={styles.card__wrapper}>
      <h3 className={styles.title}>{checkLogoInTitle(item.title)}</h3>

      {typeof item.item === "object" &&
      Object.keys(item.item)?.length &&
      !Array.isArray(item.item) ? (
        Object.keys(item.item).map((key, i) => (
          <Card
            key={i}
            isSplit={true}
            item={(item.item as { [k in string]: string })[key]}
            isLeft={i % 2 === 0 ? true : false}
          />
        ))
      ) : (
        <Card item={item.item} isLeft={index % 2 === 0 ? true : false} />
      )}
    </div>
  );
};
