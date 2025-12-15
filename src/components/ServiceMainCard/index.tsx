import React from "react";

import styles from "./style.module.scss";

type Props = {
  serviceName: string;
};

export const ServiceMainCard = ({ serviceName }: Props) => {
  return (
    <div className={styles.main__card}>
      <div className={styles.left__section}>
        <h3 className={styles.service__name}>{serviceName}</h3>

        <div className={styles.card__button}>
          <span>Записаться на приём</span>
        </div>
      </div>
      <div></div>
    </div>
  );
};
