import { useCallback, useRef } from "react";

export const useClickPulseFeedback = () => {
  const intervalRef = useRef<any>(null);

  const playTick = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 60;

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
    oscillator.stop(ctx.currentTime + 0.05);
  };

  const startPulseEffect = useCallback(() => {
    intervalRef.current = setInterval(() => {
      // if ("vibrate" in navigator) {
      //   const result = navigator.vibrate(50);
      //   if (!result) playTick();
      // } else {
        playTick();
      // }
    }, 300); // в такт с animation-duration: 1s
  }, []);

  const stopPulseEffect = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { startPulseEffect, stopPulseEffect };
};