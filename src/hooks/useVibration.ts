import { useEffect, useRef, useState } from "react";

export const useLoopVibration = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [vibrating, setVibrating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const repeatVibration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 900, 100, 900, 100, 900]);

    }

    timeoutRef.current = setTimeout(repeatVibration, 3000); // каждые 3 сек
  };

  const startEffect = () => {
    if (vibrating) return;
    setVibrating(true);

    // Визуальная пульсация
    buttonRef.current?.classList.add("animate-pulseLoops");

    // Первая вибрация + дальше повторяем
    repeatVibration();
  };

  // Запуск после первого касания страницы
  useEffect(() => {
    const handler = () => {
      startEffect();
      document.removeEventListener("pointerdown", handler);
    };

    document.addEventListener("pointerdown", handler, { once: true, passive: true });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      buttonRef.current?.classList.remove("animate-pulseLoops");
      document.removeEventListener("pointerdown", handler);
      if ("vibrate" in navigator) {
        navigator.vibrate(0);
      }
    };
  }, []);

  return {
    buttonRef,
  }
};