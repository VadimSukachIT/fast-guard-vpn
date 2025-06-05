import { useEffect, useRef } from "react";

export const useLoopVibration = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    const handler = (e: PointerEvent) => {
      buttonRef.current?.classList.add("animate-pulseLoops");
      const target = e.target as HTMLElement;
      if (target.closest("[data-ignore-vibrate]")) return;
      console.log(target, target.closest("[data-ignore-vibrate]"))

      setTimeout(() => {
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 900, 100, 900, 100, 900]);
        }

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
      if ("vibrate" in navigator) {
        navigator.vibrate(0);
      }
    };
  }, []);

  return {
    buttonRef,
  }
};