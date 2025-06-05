import { useEffect, useRef } from "react";

export const useLoopVibration = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    const handler = () => {
      timeoutRef.current = setTimeout(() => {
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 900, 100, 900, 100, 900]);
        }
      }, 3550);


      setTimeout(() => {
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 900, 100, 900, 100, 900]);
        }

        buttonRef.current?.classList.add("animate-pulseLoops");
        document.removeEventListener("pointerdown", handler);
    }, 500);
  }

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