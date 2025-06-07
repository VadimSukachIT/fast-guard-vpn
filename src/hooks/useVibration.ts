import { useAudio } from "../context/AudioContext";
import { useEffect, useRef } from "react";

export const useLoopVibration = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { stopAudio } = useAudio();

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      buttonRef.current?.classList.add("animate-pulseLoops");
      const target = e.target as HTMLElement;
      if (target.closest("[data-ignore-vibrate]")) return;
 

      setTimeout(() => {
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 900, 100, 900, 100, 900]);
        }
        
        // playLoop();

        timeoutRef.current = setInterval(() => {
          if ('vibrate' in navigator) {
            navigator.vibrate([100, 900, 100, 900, 100, 900]);
          }
        }, 3000);
        document.removeEventListener("pointerdown", handler);
    }, 500);
  }

    document.addEventListener("pointerdown", handler, { once: true, passive: true });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      buttonRef.current?.classList.remove("animate-pulseLoops");
      document.removeEventListener("pointerdown", handler);
      stopAudio();
      if ("vibrate" in navigator) {
        navigator.vibrate(0);
      }
    };
  }, []);

  return {
    buttonRef,
  }
};