import React, { useEffect, useRef, useState } from "react";

import slide1 from "../../assets/slide1.svg";
import slide2 from "../../assets/slide2.svg";
import slide3 from "../../assets/slide3.svg";
import arrow from "../../assets/Arrow.svg";

import styles from "./style.module.scss";

export const MainSlider = () => {
  const [percent, setPercent] = useState<number>(0);

  const slider = useRef<HTMLUListElement>(null);

  const arrowButtonHandler = (direction: "left" | "right") => {
    if (direction === "left" && slider?.current) {
      slider.current.style.transform = `translateX(${
        percent !== 0 ? percent + 100 : 0
      }%)`;

      setPercent((prev) => (prev !== 0 ? prev + 100 : 0));
    }

    if (direction === "right" && slider?.current) {
      slider.current.style.transform = `translateX(${
        percent !== -200 ? percent - 100 : -200
      }%)`;

      setPercent((prev) => (prev !== -200 ? prev - 100 : -200));
    }

    if (direction === "right" && percent === -200 && slider?.current) {
      slider.current.style.transform = `translateX(${0}%)`;

      setPercent(0);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      arrowButtonHandler("right");
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [percent]);

  return (
    <div className={styles.main__slider}>
      <div className={styles.slider__header}>
        <h4>Ваша улыбка начинается здесь</h4>
      </div>

      <div className={styles.slider__content}>
        <ul ref={slider}>
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
          <div
            className={`${styles.arrow__button} ${styles.left__arrow}`}
            onClick={() => arrowButtonHandler("left")}
          >
            <img src={arrow} alt="#" />
          </div>

          <div
            className={`${styles.arrow__button} ${styles.right__arrow}`}
            onClick={() => arrowButtonHandler("right")}
          >
            <img src={arrow} alt="#" />
          </div>
        </div>
      </div>
    </div>
  );
};
