import { useTranslation } from "react-i18next";
import { ADVANTAGES_LIST } from "../constants";
import { useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";

import CloseIcon from '../../../assets/svg/close.svg?react';
import { IS_ONBOARD_COMPLETED } from "../../../constants";
import { usePayment } from "../../../hooks/usePayment";
import Timer from "../../../components/Timer";
import { useThemeColor } from '../../../hooks/useThemeColor';
import Loader from "../../../components/Loader";

const UnboardingDiscountPage = () => {
  const [, setIsOnboardCompleted] = useLocalStorage(IS_ONBOARD_COMPLETED, false);
  useThemeColor('#1868AD');

  const { onPayment, isLoading } = usePayment(5, false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClose = () => {
    setIsOnboardCompleted(true);
    navigate('/');
  };

  return (
    <div className="min-h-dvh flex flex-col justify-between bg-gradient-to-b from-[#1868AD] to-[#108FD1] text-white px-[clamp(20px,5vw,32px)]  pt-[clamp(16px,4dvh,56px)] pb-[clamp(20px,6dvh,56px)]">
    {isLoading && <Loader />}

    <div className="flex flex-col justify-between w-full max-w-[480px] mx-auto flex-1">
 
    
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-wrap gap-[clamp(6px,2vw,10px)] text-[clamp(14px,3vw,16px)]">
          <span className="bg-white/20 px-[clamp(10px,3vw,16px)] py-[clamp(4px,1.5vw,8px)] rounded-md">
            {t('onboarding.discount.sale')}
          </span>
          <Timer />
        </div>
        <button onClick={onClose} className="shrink-0 ml-auto">
          <CloseIcon className="w-[clamp(28px,6vw,36px)] h-auto" />
        </button>
      </div>
  
    <div className="flex flex-1 w-full flex-col items-center justify-center gap-[clamp(24px,8dvh,300px)]">
      {/* Заголовок + описание */}
      <div className="text-left">
        <h1 className="text-[clamp(24px,9vw,36px)] font-bold mb-[clamp(12px,3vw,18px)] leading-tight">
          {t('onboarding.discount.title')}
        </h1>
        <p className="text-[clamp(14px,4.5vw,18px)] text-white/90 leading-snug pr-[clamp(16px,10vw,54px)]">
          {t('onboarding.discount.description')}
        </p>
      </div>
  
      {/* Блок с ценой и преимуществами */}
      <div className="relative bg-white/20 backdrop-blur-lg rounded-3xl px-[clamp(20px,5vw,28px)] pt-[clamp(32px,8vw,48px)] pb-[clamp(24px,6vw,32px)] w-full">
        <img
          src="/png/gift-icon.png"
          alt="Подарок"
          className="absolute -top-[clamp(20px,20vw,120px)] -right-[clamp(10px,5vw,25px)] w-[clamp(160px,55vw,240px)]"
        />
        <div className="mb-[clamp(20px,5vw,28px)]">
          <p className="text-white/70 text-[clamp(14px,4vw,18px)] line-through mb-[clamp(6px,2vw,10px)]">
            62,50 ₽
          </p>
          <p className="text-[clamp(26px,8vw,36px)] font-bold text-white leading-tight">
            20,00 ₽
            <span className="text-[clamp(14px,4vw,18px)] font-medium ml-[clamp(4px,1.5vw,6px)]">
              {t('onboarding.discount.week')}
            </span>
          </p>
        </div>
  
        <ul className="space-y-[clamp(12px,5vw,18px)] text-[clamp(14px,4vw,18px)]">
          {ADVANTAGES_LIST.map((item) => (
            <li key={item.text} className="flex items-center gap-[clamp(8px,2vw,12px)]">
              <item.Icon className="w-[clamp(20px,5vw,28px)] h-auto" />
              {t(`onboarding.${item.text}`)}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  
    {/* КНОПКА */}
    <div className="w-full max-w-[480px] mx-auto">
      <button
        onClick={onPayment}
        className="w-full h-[clamp(52px,8dvh,56px)] text-[clamp(14px,4.5vw,18px)] bg-white text-heavyBlue rounded-lg"
      >
        {t('onboarding.discount.getDiscount')}
      </button>
    </div>
  </div>
  
  );
};

export default UnboardingDiscountPage;
