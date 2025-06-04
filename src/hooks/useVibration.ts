import { useEffect, useRef } from "react";

export const useLoopVibration = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('effect triggered');
    const isAndroidStandalone = () =>
      /android/i.test(navigator.userAgent) &&
      (window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone);

    const tick = () => {
      if ("vibrate" in navigator) {
        if (isAndroidStandalone()) {
          navigator.vibrate(30);
        }
      }
    };

    // Стартуем немедленно, потом каждые 1000 мс
    tick();
    intervalRef.current = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      console.log('clear triggered');
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
};