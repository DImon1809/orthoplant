import { useEffect, useRef, useState } from "react";
import type { ServicesCosts } from "../../hooks/useGetServiceInfo";

import styles from "./style.module.scss";

type Props = {
  item: ServicesCosts;
};

const Item = ({ service, isLeft }: { service: string; isLeft: boolean }) => {
  const cardRef = useRef<HTMLLIElement>(null);

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
    <li
      className={`${styles.costs__card} ${isLeft ? styles.left : styles.right} ${moveCard ? styles.move : ""}`}
      ref={cardRef}
    >
      <div>{service}</div>
      <div className={styles.cost}>{service}</div>
    </li>
  );
};

export const ServiceCostsList = ({ item }: Props) => {
  return (
    <div className={styles.service__costs}>
      <h3 className={styles.title}>{item.title}</h3>

      <ul className={styles.costs__wrapper}>
        {item.costs.map((cost, key) => (
          <Item
            service={cost.service}
            key={key}
            isLeft={key % 2 === 0 ? true : false}
          />
        ))}
      </ul>
    </div>
  );
};
