import React from "react";

import type { Item } from "../../hooks/useGetServiceInfo";

import styles from "./style.module.scss";
import { checkLogoInTitle } from "../../utils/checkLogoInTitle";

type CardProps = {
  item: Item["item"];
  isSplit?: boolean;
};

type ServiceCardProps = {
  item: Item;
};

const Card = ({ item, isSplit }: CardProps) => {
  return (
    <div className={`${styles.service__card} ${isSplit ? styles.split : ""}`}>
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

export const ServiceCard = ({ item }: ServiceCardProps) => {
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
          />
        ))
      ) : (
        <Card item={item.item} />
      )}
    </div>
  );
};
