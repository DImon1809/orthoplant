import { useEffect, useRef, useState } from "react";

import type { TouchEvent } from "react";

import { useIsMobile } from "../../hooks/useIsMobule";

// import slide1 from "../../assets/slide1.svg";
// import slide4 from "../../assets/slide4.svg";
// import slide2 from "../../assets/slide2.svg";
// import slide3 from "../../assets/slide3.svg";
import arrow from "../../assets/Arrow.svg";

import slide1 from "../../assets/new-advertisement/slide1.webp";
import slide2 from "../../assets/new-advertisement/slide2.webp";
import slide3 from "../../assets/new-advertisement/slide3.webp";

import styles from "./style.module.scss";

export const MainSlider = () => {
  const { isMobile } = useIsMobile();

  const [percent, setPercent] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [currentX, setCurrentX] = useState<number>(0);

  const slider = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = (direction: "left" | "right") => {
    if (!slider.current) return;

    if (direction === "left") {
      const newPercent = percent !== 0 ? percent + 100 : 0;
      slider.current.style.transform = `translateX(${newPercent}%)`;
      setPercent(newPercent);
    } else {
      const newPercent = percent !== -200 ? percent - 100 : -200;
      slider.current.style.transform = `translateX(${newPercent}%)`;

      if (percent === -200) {
        slider.current.style.transform = `translateX(0%)`;
        setPercent(0);
      } else {
        setPercent(newPercent);
      }
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    setIsSwiping(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping || !slider.current) return;

    const touchX = e.touches[0].clientX;
    const diff = touchX - startX;

    const maxOffset = 50;
    const offset = Math.max(Math.min(diff, maxOffset), -maxOffset);

    slider.current.style.transform = `translateX(calc(${percent}% + ${offset}px))`;
    slider.current.style.transition = "none";

    setCurrentX(touchX);
  };

  const handleTouchEnd = () => {
    if (!isSwiping || !slider.current) return;

    const diff = currentX - startX;
    const threshold = 50;

    slider.current.style.transition = "transform 0.3s ease";

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToSlide("left");
      } else {
        goToSlide("right");
      }
    } else {
      slider.current.style.transform = `translateX(${percent}%)`;
    }

    setIsSwiping(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide("right");
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [percent]);

  return (
    <div className={styles.main__slider}>
      <div className={styles.slider__header}>
        <h4>Стоматология, где каждая улыбка становится счастьем</h4>
      </div>

      <div
        ref={containerRef}
        className={styles.slider__content}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={(e) => {
          if (!isMobile) return;
          setIsSwiping(true);
          setStartX(e.clientX);
          setCurrentX(e.clientX);
        }}
        onMouseMove={(e) => {
          if (!isSwiping || !isMobile || !slider.current) return;

          const diff = e.clientX - startX;
          const maxOffset = 50;
          const offset = Math.max(Math.min(diff, maxOffset), -maxOffset);

          slider.current.style.transform = `translateX(calc(${percent}% + ${offset}px))`;
          slider.current.style.transition = "none";

          setCurrentX(e.clientX);
        }}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        <ul ref={slider}>
          <li className={styles.slide}>
            <img src={slide1} alt="#" draggable="false" />
          </li>
          <li className={styles.slide}>
            <img src={slide2} alt="#" draggable="false" />
          </li>
          <li className={styles.slide}>
            <img src={slide3} alt="#" draggable="false" />
          </li>
        </ul>

        <div className={styles.arrows__container}>
          <div
            className={`${styles.arrow__button} ${styles.left__arrow}`}
            onClick={() => goToSlide("left")}
          >
            <img src={arrow} alt="Назад" />
          </div>

          <div
            className={`${styles.arrow__button} ${styles.right__arrow}`}
            onClick={() => goToSlide("right")}
          >
            <img src={arrow} alt="Вперед" />
          </div>
        </div>
      </div>
    </div>
  );
};
