import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Timer = ({ duration = 120 }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <span className="bg-white/20 px-3 py-1 rounded-md flex items-center text-[clamp(14px,4vw,16px)]">
      {t('onboarding.discount.timeLeft', { time: formatTime(timeLeft) })}
    </span>
  );
};

export default Timer;