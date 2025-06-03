/// <reference types="vite-plugin-svgr/client" />
import { useNavigate } from "react-router-dom";

import Promo from "../../components/Promo";
import { useLocalStorage } from 'usehooks-ts';
import { SERVERS, DEFAULT_SERVER_ID, IS_PREMIUM_PURCHASED, SELECTED_SERVER_ID } from '../../constants';

import SettingsIcon from '../../assets/svg/settings.svg?react';
import DownloadIcon from '../../assets/svg/download.svg?react';
import UploadIcon from '../../assets/svg/upload.svg?react';
import ArrowRightIcon from '../../assets/svg/arrow-right.svg?react';
import GreenConnectionIcon from '../../assets/svg/green-connection.svg?react';
import NoConnectionIcon from '../../assets/svg/no-connection.svg?react';
import { useTranslation } from "react-i18next";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationPrompt from "../../components/NotificationPrompt";
import { useThemeColor } from "../../hooks/useThemeColor";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { onSubscribe, onClose, showPrompt } = useNotifications();
  useThemeColor()

  const [selectedServerId] = useLocalStorage(SELECTED_SERVER_ID, DEFAULT_SERVER_ID);
  const [isPremiumPurchased] = useLocalStorage(IS_PREMIUM_PURCHASED, false);

  const onServerClick = () => {
    navigate('/servers');
  };

  const onSettingsClick = () => {
    navigate('/settings');
  };

  const onOptimalConnectionClick = () => {
    navigate(isPremiumPurchased ? '/servers' : '/onboarding');
  }

  const ServerFlagIcon = SERVERS.byIds[selectedServerId].FlagIcon;

  return (
    <div className="min-h-dvh flex flex-col bg-lightGrey px-[clamp(16px,4vw,24px)]  pb-[clamp(10px,1.5vh,44px)]">
    <div className="w-full max-w-[480px] mx-auto flex flex-col items-center justify-start flex-1">
  
      <div className='w-full flex flex-col items-center'>
      <div className="w-full flex justify-end">
      <div className="flex items-center justify-end w-full   pt-[clamp(16px,4vh,56px)] pb-[clamp(10px,2.5vh,14px)]">
        <button
          onClick={onSettingsClick}
          className="flex items-center justify-center w-[clamp(36px,9vw,44px)] h-[clamp(36px,9vw,44px)]"
        >
          <SettingsIcon className="w-[clamp(20px,6vw,24px)] h-auto" />
        </button>
        </div>
      </div>
      {!isPremiumPurchased && <Promo />}
      </div>
  
      <div className="w-full mx-auto flex flex-1 justify-center flex-col items-center gap-[clamp(12px,2.5vh,36px)]">
      <div className="flex flex-col items-center">
        <div className="text-center text-shadyGrey text-[clamp(36px,10vw,54px)] font-bold">
          00:00:00
        </div>
        <div className="w-full flex justify-center items-center gap-[clamp(6px,2vw,10px)]">
          <NoConnectionIcon className="w-[clamp(16px,5vw,24px)] h-[clamp(16px,5vw,24px)]" />
          <div className="text-[clamp(14px,4vw,16px)] text-shadyGrey">{t('home.notConnected')}</div>
        </div>
      </div>
  
      {/* Карточка */}
      <div className="w-full bg-white rounded-3xl p-[clamp(16px,4vw,24px)] shadow-md">
        {/* Сервер */}
        <div
          onClick={onServerClick}
          className="flex justify-between items-center px-[clamp(12px,3vw,20px)] py-[clamp(12px,2.5vw,16px)] bg-lightGrey rounded-lg mb-[clamp(16px,3vw,24px)]"
        >
          <div className="flex items-center gap-[clamp(10px,2.5vw,14px)]">
            <ServerFlagIcon className="w-[clamp(20px,10vw,30px)] h-[clamp(16px,10vw,24px)]" />
            <div>
              <p className="text-[clamp(16px,4.5vw,18px)] text-black font-medium">{SERVERS.byIds[selectedServerId].name}</p>
              <p className="text-[clamp(14px,4vw,16px)] text-primaryGrey">{SERVERS.byIds[selectedServerId].town}</p>
            </div>
          </div>
          <div className="flex gap-[clamp(6px,1.5vw,10px)] items-center">
            <GreenConnectionIcon className="w-[clamp(20px,5vw,30px)] h-[clamp(16px,5vw,24px)]" />
            <ArrowRightIcon className="w-[clamp(16px,4vw,24px)] h-[clamp(16px,4vw,24px)]" />
          </div>
        </div>
  
        <div className="flex justify-between gap-[clamp(10px,2.5vw,14px)] mb-[clamp(16px,3vw,24px)]">
          {[DownloadIcon, UploadIcon].map((Icon, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-start bg-greyWhite rounded-lg p-[clamp(12px,3vw,18px)]"
            >
              <Icon className="mb-[clamp(6px,2vw,10px)] w-[clamp(16px,6vw,24px)] h-[clamp(16px,6vw,24px)]" />
              <p className="text-[clamp(16px,5vw,20px)] font-semibold text-black">0 Mbps/s</p>
              <p className="text-[clamp(14px,4vw,16px)] text-primaryGrey">
                {t(i === 0 ? 'home.download' : 'home.upload')}
              </p>
            </div>
          ))}
        </div>
  
        {showPrompt && <NotificationPrompt onSubscribe={onSubscribe} onClose={onClose} />}
  
        {/* Кнопка */}
        <button
          onClick={onOptimalConnectionClick}
          className="w-full h-[clamp(52px,8vh,56px)] bg-lightPurple text-white text-[clamp(14px,4.5vw,18px)] font-semibold rounded-lg"
        >
          {t('home.optimalConnection')}
        </button>
        </div>
      </div>
    </div>
  </div>  
  
  );
};

export default HomePage;
