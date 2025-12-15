import React from "react";
import type { WhyChange } from "../../hooks/useGetServiceInfo";
import { checkLogoInTitle } from "../../utils/checkLogoInTitle";

import styles from "./style.module.scss";

type Props = {
  item: WhyChange;
};

export const WhyChangeCard = ({ item }: Props) => {
  return (
    <div className={styles.why__change__wrapper}>
      <h3 className={styles.title}>{checkLogoInTitle(item.title)}</h3>

      <div className={styles.why__change}>{item.text}</div>
    </div>
  );
};
