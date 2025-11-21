import React from "react";

import slide1 from "../../assets/slide1.svg";
import slide2 from "../../assets/slide2.svg";
import slide3 from "../../assets/slide3.svg";
import arrow from "../../assets/Arrow.svg";

import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./style.module.scss";

export const MainSlider = () => {
  return (
    <div className={styles.main__slider}>
      <div className={styles.slider__header}>
        <h4>Ваша улыбка начинается здесь</h4>
      </div>

      <div className={styles.slider__content}>
        <ul>
          <li className={styles.slide}>
            <img src={slide1} alt="#" />
          </li>
          <li className={styles.slide}>
            <img src={slide2} alt="#" />
          </li>
          <li className={styles.slide}>
            <img src={slide3} alt="#" />
          </li>
        </ul>

        <div>
          <div className={`${styles.arrow__button} ${styles.left__arrow}`}>
            <img src={arrow} alt="#" />
          </div>

          <div className={`${styles.arrow__button} ${styles.right__arrow}`}>
            <img src={arrow} alt="#" />
          </div>
        </div>
      </div>
    </div>
  );
};
