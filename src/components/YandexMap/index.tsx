import { useEffect, useRef } from "react";

import styles from "./style.module.scss";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps: any;
  }
}

export const YandexMap = ({ center = [55.80528, 37.752095] }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstance = useRef<any | null>(null);

  useEffect(() => {
    // Проверяем, загружена ли уже API Яндекс.Карт
    if (!window?.ymaps) {
      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=e9894019-7058-4da3-b089-9f935a0f218b&lang=ru_RU`;
      script.async = true;

      script.onload = () => {
        window.ymaps.ready(initMap);
      };

      document.head.appendChild(script);
    } else {
      window.ymaps.ready(initMap);
    }

    function initMap() {
      if (!mapRef.current || mapInstance.current) return;

      // Создаем карту
      mapInstance.current = new window.ymaps.Map(mapRef.current, {
        center: [55.80528, 37.752095],
        zoom: 17,
        controls: ["zoomControl", "fullscreenControl"],
      });

      // Добавляем маркер
      const marker = new window.ymaps.Placemark(
        [55.80528, 37.752095],
        {
          balloonContent: "Центр карты",
        },
        {
          preset: "islands#blueDotIcon",
        },
      );

      mapInstance.current.geoObjects.add(marker);
    }

    // Очистка при размонтировании
    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [center]);

  return (
    <div className={styles.yandex__map} id="location">
      <h4 className={styles.address}>
        Наш адрес: ул. Амурская, дом 2, корпус 2, помещение&nbsp;7Н,
        вн.тер.г.&nbsp;муниципальный&nbsp;округ&nbsp;Гольяново, г.&nbsp;Москва,
        105122
      </h4>
      <div ref={mapRef} className={styles.yandex__map} />
    </div>
  );
};
