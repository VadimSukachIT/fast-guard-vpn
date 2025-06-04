import { useEffect, useRef } from "react";

export const useLoopVibration = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handle = () => {
      console.log('hi');
      navigator.vibrate?.(30); // разрешаем
  
      intervalRef.current = setInterval(() => {
        navigator.vibrate?.(30);
      }, 1000);
  
      document.removeEventListener("pointerdown", handle);
    };
  
    document.addEventListener("pointerdown", handle, { once: true, passive: true });
  
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
};