import Star from "../../assets/Star.svg";

import styles from "./style.module.scss";

export const FooterLine = () => {
  return (
    <div className={styles.footer__line}>
      {new Array(10).fill(1).map((_, i) => (
        <div className={styles.star__wrapper} key={i}>
          <span>ORTHOPLANT</span>

          <img src={Star} alt="#" className={styles.star} />
        </div>
      ))}
    </div>
  );
};
