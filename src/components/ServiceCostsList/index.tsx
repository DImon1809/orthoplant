import React from "react";
import type { ServicesCosts } from "../../hooks/useGetServiceInfo";

import styles from "./style.module.scss";

type Props = {
  item: ServicesCosts;
};

export const ServiceCostsList = ({ item }: Props) => {
  return (
    <div className={styles.service__costs}>
      <h3 className={styles.title}>{item.title}</h3>

      <ul className={styles.costs__wrapper}>
        {item.costs.map((cost, key) => (
          <li key={key} className={styles.costs__card}>
            <div>{cost.service}</div>
            <div>{cost.cost}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
