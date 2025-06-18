import { useNavigate } from "react-router";

import { useLocalStorage } from "usehooks-ts";
import { IS_ONBOARD_COMPLETED } from "../../constants";

import CloseIcon from '../../assets/svg/paywall-close.svg?react';
import NetworkIcon from '../../assets/svg/paywall-network.svg?react';
import LockIcon from '../../assets/svg/paywall-lock.svg?react';
import EyeIcon from '../../assets/svg/paywall-eye.svg?react';
import DownloadIcon from '../../assets/svg/paywall-download.svg?react';
import ClockIcon from '../../assets/svg/paywall-clock.svg?react';

import { useFirstLoad } from "../../hooks/firstLoad";
import { usePayment } from "../../hooks/usePayment";
import { useThemeColor } from "../../hooks/useThemeColor";
import Loader from "../../components/Loader";
import './shine.css';

const ADVANTAGES = [
  { Icon: LockIcon, title: 'Безопасность в Интернете', desc: 'Полная анонимность в сети, защита личных данных от слежки' },
  { Icon: NetworkIcon, title: 'Доступ к контенту со всего мира', desc: 'Обход блокировок, доступ к контенту без ограничений' },
  { Icon: EyeIcon, title: 'Абсолютная приватность', desc: 'Больше никаких назойливых баннеров и трекеров.' },
  { Icon: DownloadIcon, title: 'Доступ к приложениям', desc: 'Устанавливайте любые заблокированные приложения' },
  { Icon: ClockIcon, title: 'Максимальная скорость', desc: 'Просмотр видео без лагов и ограничений' },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  useFirstLoad();
  useThemeColor('#ECF1F9');

  const [isOnboardCompleted] = useLocalStorage(IS_ONBOARD_COMPLETED, false);
  const { onPayment, isLoading } = usePayment(1);

  const onClose = () => {
    isOnboardCompleted ? navigate(-1) : navigate('/onboarding/info');
  };

  return (
    <div className="relative h-dvh bg-paywallBg text-[clamp(14px,4dvw,18px)] flex flex-col max-w-[480px] mx-auto pt-[clamp(16px,4dvh,56px)] pb-[clamp(20px,6dvh,56px)]">
      {isLoading && <Loader />}

      {/* Header + видео */}
      <div className="shrink-0 px-[clamp(1px,4dvw,24px)]">
      <div className="w-full relative flex justify-center h-[clamp(100px,16dvh,150px)]">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 shrink-0 ml-auto"
            data-ignore-vibrate
          >
            <CloseIcon className="w-[clamp(28px,6dvw,36px)] h-auto" />
          </button>
          <video
            className="h-[clamp(100px,16dvh,150px)]"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/webm/vpn-animation.webm" type="video/webm" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
        <h1 className="text-[clamp(20px,5dvw,24px)] text-center font-bold text-пку mb-[clamp(8px,3dvw,16px)]">
          FastGuard VPN Premium
        </h1>
        <p className="text-center text-textGrey text-[clamp(15px,4dvw,18px)] leading-snug">
          Ваши действия в интернете остаются конфиденциальными. Мы не храним журналы и защищаем трафик шифрованием.
        </p>
      </div>

      {/* Scrollable content */}
      <div className="scroll-hidden no-scrollbar flex-1 overflow-y-auto min-h-0 px-[clamp(16px,4dvw,24px)] mt-[clamp(16px,4dvw,24px)] mb-[clamp(20px,5dvw,28px)]">
        <div className="bg-white rounded-xl px-[clamp(16px,4dvw,24px)] py-[clamp(12px,3dvw,20px)]">
          {ADVANTAGES.map(({ Icon, title, desc }, index) => (
            <div
              key={title}
              className="flex items-start gap-[clamp(12px,4dvw,16px)] pt-[clamp(10px,3dvw,14px)]"
            >
              <Icon width="32px" height="32px" />
              <div
                className={`flex-1 flex flex-col pb-[clamp(10px,3dvw,14px)] ${
                  index !== ADVANTAGES.length - 1 ? 'border-b border-[#D8DCE5]' : ''
                }`}
              >
                <h3 className="text-black font-semibold text-[clamp(14px,4dvw,16px)]">
                  {title}
                </h3>
                <p className="text-[#7A7B7C] text-[clamp(14px,4dvw,16px)] leading-tight">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="shrink-0 px-[clamp(20px,5dvw,32px)]">
      <button
          onClick={onPayment}
          className="overflow-hidden relative w-full h-[clamp(52px,8vh,56px)] bg-lightPurple text-white text-[clamp(14px,4.5vw,18px)] font-semibold rounded-lg"
        >
          <div className="shine" />
           Подпишись за 10₽ / месяц
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;
