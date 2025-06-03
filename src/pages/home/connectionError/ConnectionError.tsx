import Header from "../../../components/Header";
import UnplagIcon from '../../../assets/svg/unplag.svg?react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useThemeColor } from '../../../hooks/useThemeColor';

const ConnectionErrorPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useThemeColor();
  const onGoBack = () => navigate('/servers');

  const onConnect = () => {
    const pwaId = localStorage.getItem('pwaId');
    window.location.href = `https://t.me/best_tester_in_the_world_bot?start=pwa_${pwaId}`;
  };

  return (
    <div className="flex flex-col min-h-dvh justify-between bg-lightGrey px-[clamp(16px,4vw,24px)] pb-[clamp(20px,6vh,56px)]">
      <Header onClick={onGoBack} />

      <div className="flex flex-col items-center text-center flex-grow justify-center">
        <UnplagIcon className="w-[80vw] h-auto mb-[clamp(20px,5vw,32px)]" />

        <h1 className="text-[clamp(20px,5.5vw,26px)] font-semibold text-black mb-[clamp(8px,2vw,14px)]">
          {t('connectionError.title')}
        </h1>

        <p className="text-[clamp(14px,4.5vw,18px)] text-textGrey leading-snug max-w-[420px]">
          {t('connectionError.description')}
        </p>
      </div>

      <button
        onClick={onConnect}
        className="w-full h-[clamp(52px,8vh,56px)] bg-lightPurple text-white text-[clamp(14px,4.5vw,18px)] font-medium rounded-lg"
      >
        Перейти
      </button>
    </div>
  );
};

export default ConnectionErrorPage;
