import { useCallback } from "react";

export const useClickFeedback = () => {
  const handleClickFeedback = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if ("vibrate" in navigator) {
      console.log('Vibration called');
      navigator.vibrate(300);
    }

    const el = e.currentTarget;
    el.classList.add("animate-pulseOnce");

    setTimeout(() => {
      el.classList.remove("animate-pulseOnce");
    }, 300); // Длительность эффекта в ms (должна совпадать с Tailwind-анимацией)
  }, []);

  return handleClickFeedback;
};