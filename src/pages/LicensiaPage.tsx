import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { useIsMobile } from "../hooks/useIsMobule";
import Lic1 from "../assets/licensia/Lic1.webp";
import Lic2 from "../assets/licensia/Lic2.webp";
import arrow from "../assets/Arrow.svg";
import styles from "./style.module.scss";

export const LicensiaSlider = () => {
  const { isMobile } = useIsMobile();
  const [percent, setPercent] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [currentX, setCurrentX] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fullscreenZoom, setFullscreenZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isFullscreenSwiping, setIsFullscreenSwiping] =
    useState<boolean>(false);
  const [fullscreenStartX, setFullscreenStartX] = useState<number>(0);
  const [fullscreenCurrentX, setFullscreenCurrentX] = useState<number>(0);

  const slider = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenImageRef = useRef<HTMLImageElement>(null);

  const slides = [Lic1, Lic2];
  const currentSlideIndex = percent === 0 ? 0 : 1;

  const goToSlide = (direction: "left" | "right") => {
    if (!slider.current) return;

    if (direction === "left") {
      const newPercent = percent !== 0 ? 0 : -100;
      slider.current.style.transform = `translateX(${newPercent}%)`;
      setPercent(newPercent);
    } else {
      const newPercent = percent !== -100 ? -100 : 0;
      slider.current.style.transform = `translateX(${newPercent}%)`;

      if (percent === -100) {
        slider.current.style.transform = `translateX(0%)`;
        setPercent(0);
      } else {
        setPercent(newPercent);
      }
    }
  };

  const goToFullscreenSlide = (direction: "left" | "right") => {
    if (direction === "left") {
      goToSlide("left");
    } else {
      goToSlide("right");
    }
    resetZoom();
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

  // Обработчики свайпа для полноэкранного режима
  const handleFullscreenTouchStart = (e: React.TouchEvent) => {
    if (isMobile) {
      if (fullscreenZoom === 1) {
        // Если не увеличен - включаем режим свайпа
        setIsFullscreenSwiping(true);
        setFullscreenStartX(e.touches[0].clientX);
        setFullscreenCurrentX(e.touches[0].clientX);
      } else {
        // Если увеличен - режим перетаскивания
        setIsDragging(true);
        setDragStart({
          x: e.touches[0].clientX - imagePosition.x,
          y: e.touches[0].clientY - imagePosition.y,
        });
      }
    } else {
      // На десктопе только перетаскивание при зуме
      if (fullscreenZoom > 1) {
        setIsDragging(true);
        setDragStart({
          x: e.touches[0].clientX - imagePosition.x,
          y: e.touches[0].clientY - imagePosition.y,
        });
      }
    }
  };

  const handleFullscreenTouchMove = (e: React.TouchEvent) => {
    if (isMobile) {
      if (isFullscreenSwiping && fullscreenZoom === 1) {
        // Свайп для навигации по слайдам
        const touchX = e.touches[0].clientX;
        setFullscreenCurrentX(touchX);
      } else if (isDragging && fullscreenZoom > 1 && e.touches.length === 1) {
        // Перетаскивание увеличенного изображения
        const newX = e.touches[0].clientX - dragStart.x;
        const newY = e.touches[0].clientY - dragStart.y;
        setImagePosition({ x: newX, y: newY });
      }
    } else {
      // На десктопе только перетаскивание
      if (isDragging && fullscreenZoom > 1 && e.touches.length === 1) {
        const newX = e.touches[0].clientX - dragStart.x;
        const newY = e.touches[0].clientY - dragStart.y;
        setImagePosition({ x: newX, y: newY });
      }
    }
  };

  const handleFullscreenTouchEnd = () => {
    if (isMobile && isFullscreenSwiping && fullscreenZoom === 1) {
      const diff = fullscreenCurrentX - fullscreenStartX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          goToFullscreenSlide("left");
        } else {
          goToFullscreenSlide("right");
        }
      }
    }

    setIsFullscreenSwiping(false);
    setIsDragging(false);
  };

  // Обработчики мыши для полноэкранного режима
  const handleFullscreenMouseDown = (e: React.MouseEvent) => {
    if (fullscreenZoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      });
    }
  };

  const handleFullscreenMouseMove = (e: React.MouseEvent) => {
    if (isDragging && fullscreenZoom > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setImagePosition({ x: newX, y: newY });
    }
  };

  const handleFullscreenMouseUp = () => {
    setIsDragging(false);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    document.body.style.overflow = "hidden";
    setFullscreenZoom(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = "auto";
  };

  const zoomIn = () => {
    if (fullscreenZoom < 3) {
      setFullscreenZoom((prev) => Math.min(prev + 0.5, 3));
    }
  };

  const zoomOut = () => {
    if (fullscreenZoom > 1) {
      setFullscreenZoom((prev) => Math.max(prev - 0.5, 1));
      if (fullscreenZoom - 0.5 === 1) {
        setImagePosition({ x: 0, y: 0 });
      }
    }
  };

  const resetZoom = () => {
    setFullscreenZoom(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleFullscreenDoubleTap = () => {
    if (isMobile) {
      if (fullscreenZoom === 1) {
        zoomIn();
      } else {
        resetZoom();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "Escape") {
          closeFullscreen();
        } else if (e.key === "+" || e.key === "=") {
          zoomIn();
        } else if (e.key === "-") {
          zoomOut();
        } else if (e.key === "0") {
          resetZoom();
        } else if (e.key === "ArrowLeft") {
          goToFullscreenSlide("left");
        } else if (e.key === "ArrowRight") {
          goToFullscreenSlide("right");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id="licensia" className={styles.main__slider}>
        <div className={styles.slider__header}>
          <h4>Лицензия</h4>
        </div>

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
            <li className={styles.slide} onClick={openFullscreen}>
              <img src={Lic1} alt="Лицензия 1" draggable="false" />
            </li>
            <li className={styles.slide} onClick={openFullscreen}>
              <img src={Lic2} alt="Лицензия 2" draggable="false" />
            </li>
          </ul>
        </div>
      </div>

      {isFullscreen && (
        <div
          className={styles.fullscreen__overlay}
          onClick={closeFullscreen}
          onMouseMove={handleFullscreenMouseMove}
          onMouseUp={handleFullscreenMouseUp}
          onTouchMove={handleFullscreenTouchMove}
          onTouchEnd={handleFullscreenTouchEnd}
        >
          <div
            className={styles.fullscreen__content}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleFullscreenMouseDown}
            onTouchStart={handleFullscreenTouchStart}
            onDoubleClick={handleFullscreenDoubleTap}
          >
            <img
              ref={fullscreenImageRef}
              src={slides[currentSlideIndex]}
              alt={`Лицензия ${currentSlideIndex + 1}`}
              className={styles.fullscreen__image}
              style={{
                transform: `scale(${fullscreenZoom}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                cursor:
                  fullscreenZoom > 1
                    ? isDragging
                      ? "grabbing"
                      : "grab"
                    : "default",
              }}
            />

            <button
              className={styles.fullscreen__close}
              onClick={closeFullscreen}
              aria-label="Закрыть полноэкранный режим"
            >
              Закрыть
            </button>

            <div className={styles.zoom__controls}>
              <button
                onClick={zoomIn}
                disabled={fullscreenZoom >= 3}
                className={styles.zoom__button}
                aria-label="Увеличить"
              >
                +
              </button>
              <span className={styles.zoom__level}>
                {fullscreenZoom.toFixed(1)}x
              </span>
              <button
                onClick={zoomOut}
                disabled={fullscreenZoom <= 1}
                className={styles.zoom__button}
                aria-label="Уменьшить"
              >
                –
              </button>
              {fullscreenZoom > 1 && (
                <button
                  onClick={resetZoom}
                  className={styles.zoom__reset}
                  aria-label="Сбросить зум"
                >
                  Сбросить
                </button>
              )}
            </div>

            <div className={styles.fullscreen__info}>
              <span className={styles.current__slide}>
                {currentSlideIndex + 1} / {slides.length}
              </span>
            </div>

            {!isMobile && (
              <>
                <button
                  className={`${styles.fullscreen__arrow} ${styles.fullscreen__arrow_left}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToFullscreenSlide("left");
                  }}
                  aria-label="Предыдущий слайд"
                >
                  <img src={arrow} alt="Назад" />
                </button>
                <button
                  className={`${styles.fullscreen__arrow} ${styles.fullscreen__arrow_right}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToFullscreenSlide("right");
                  }}
                  aria-label="Следующий слайд"
                >
                  <img src={arrow} alt="Вперед" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const LicensiaPage = () => {
  return (
    <>
      <LicensiaSlider />
    </>
  );
};
