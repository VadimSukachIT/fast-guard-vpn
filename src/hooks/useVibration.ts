import { useEffect, useRef, useState } from "react";

export const useLoopVibration = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [vibrating, setVibrating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isVibrationAvailable = () =>
    typeof navigator !== "undefined" && "vibrate" in navigator;

  const loopVibrate = () => {
    if (isVibrationAvailable()) {
      navigator.vibrate([100, 900, 100, 900, 100, 900]);
    }
    timeoutRef.current = setTimeout(loopVibrate, 3000);
  };

  useEffect(() => {
    const handler = () => {
      if (!vibrating) {
        setVibrating(true);
        if (isVibrationAvailable()) {
          navigator.vibrate([100, 900, 100, 900, 100, 900]);
        }
        buttonRef.current?.classList.add("animate-pulseLoops");
        timeoutRef.current = setTimeout(loopVibrate, 3000);
      }

      document.removeEventListener("pointerdown", handler);
    };

    document.addEventListener("pointerdown", handler, { once: true, passive: true });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      buttonRef.current?.classList.remove("animate-pulseLoops");
      document.removeEventListener("pointerdown", handler);
      if (isVibrationAvailable()) {
        navigator.vibrate(0);
      }
    };
  }, [vibrating]);


  return {
    buttonRef,
  }
};