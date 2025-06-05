import React, { createContext, useContext, useRef, useState } from "react";

type AudioContextType = {
  playAudio: (src?: string) => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const DEFAULT_SRC = "/sounds/default.mp3";

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (src = DEFAULT_SRC) => {
    if (isPlaying) return;

    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(src);
    audioRef.current = audio;

    audio.onended = () => {
      setIsPlaying(false);
    };

    audio.play().catch((err) => {
      console.warn("Failed to play audio:", err);
      setIsPlaying(false);
    });
  };

  return (
    <AudioContext.Provider value={{ playAudio, isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};
export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
