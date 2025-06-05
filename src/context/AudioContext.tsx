import React, { createContext, useContext, useRef, useState } from "react";


type AudioContextType = {
  playAudio: (src?: string) => void;
  playLoop: (src?: string) => void;
  stopAudio: () => void;
  isPlaying: boolean;
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

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
  };

  const playLoop = (src = DEFAULT_SRC) => {
    stopAudio(); // убедимся, что предыдущий звук завершён
    setIsPlaying(true);

    const audio = new Audio(src);
    audio.loop = true;
    audioRef.current = audio;

    audio.play().catch((err) => {
      console.warn("Failed to loop audio:", err);
      setIsPlaying(false);
    });
  };

  return (
    <AudioContext.Provider value={{ playAudio, isPlaying, stopAudio, playLoop }}>
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
