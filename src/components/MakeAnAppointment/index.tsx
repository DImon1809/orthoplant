import React, { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { YandexMap } from "../YandexMap";
import styles from "./style.module.scss";

export const MakeAnAppointment = () => {
  const [phone, setPhone] = useState("+7 ");
  const [name, setName] = useState("");
  const [isError, setIsError] = useState<boolean>(false);

  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/[^\d+]/g, "");

    if (!cleaned.startsWith("+7")) {
      return "+7 ";
    }

    const digits = cleaned.substring(2);

    if (digits.length === 0) {
      return "+7 ";
    } else if (digits.length <= 3) {
      return `+7 (${digits}`;
    } else if (digits.length <= 6) {
      return `+7 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else if (digits.length <= 8) {
      return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else {
      return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`;
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    const input = e.target.value;
    const cursorPosition = e.target.selectionStart || 0;

    const formatted = formatPhoneNumber(input);
    setPhone(formatted);

    setTimeout(() => {
      const inputElement = e.target;
      let newCursorPosition = cursorPosition;

      if (input.length < formatted.length) {
        newCursorPosition += formatted.length - input.length;
      } else if (input.length > formatted.length) {
        newCursorPosition -= input.length - formatted.length;
      }

      inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const cursorPosition = e.currentTarget.selectionStart || 0;

    if ((e.key === "Backspace" || e.key === "Delete") && cursorPosition <= 3) {
      e.preventDefault();
    }

    if (
      !/[\d]/.test(e.key) &&
      ![
        "Backspace",
        "Delete",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const isValidPhone = (): boolean => {
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length === 11;
  };

  const getCleanPhoneNumber = (): string => {
    return phone.replace(/\D/g, "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhone()) {
      setIsError(true);
      return;
    }

    const subject = "Новая запись на прием";
    const body = `Имя: ${name}\nТелефон: ${phone}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=jackobmike85@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank", "width=800,height=600");

    const cleanPhone = getCleanPhoneNumber();
    console.log("Имя:", name);
    console.log("Телефон:", cleanPhone);
  };

  return (
    <section className={styles.make__an__appointment}>
      <form className={styles.form} onSubmit={handleSubmit} id="appointment">
        <h3 className={styles.title}>Записаться сейчас</h3>
        <h4 className={styles.sub__title}>Мы перезвоним</h4>

        <input
          type="text"
          className={styles.form__input}
          placeholder="ФИО"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className={styles.phone__number__input}>
          <input
            type="tel"
            className={`${styles.form__input} ${!isValidPhone() && phone.length > 3 ? styles.invalid : ""}`}
            placeholder="Номер телефона"
            value={phone}
            onChange={handlePhoneChange}
            onKeyDown={handleKeyDown}
            required
            maxLength={18}
          />

          {isError && (
            <span className={styles.error}>Введите корректный номер</span>
          )}
        </div>

        <button type="submit" className={styles.button}>
          <span>Отправить</span>
        </button>
      </form>
      <YandexMap />
    </section>
  );
};
