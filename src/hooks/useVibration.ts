import { useEffect, useRef, useState } from "react";

export const useLoopVibration = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [vibrating, setVibrating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const repeatVibration = () => {
    buttonRef.current?.classList.add("animate-pulseLoops");
    timeoutRef.current = setTimeout(repeatVibration, 3000); // каждые 3 сек
  };

  const startEffect = () => {
    if (vibrating) return;
    setVibrating(true);
    setTimeout(() => {
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 900, 100, 900, 100, 900]);
      }
      repeatVibration();
    }, 500)
  };

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