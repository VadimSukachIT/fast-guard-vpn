import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import { ADVANTAGES_LIST } from "./constants";
import { useLocalStorage } from "usehooks-ts";

import { IS_ONBOARD_COMPLETED } from "../../constants";
import CloseIcon from '../../assets/svg/close.svg?react';
import CheckmarkIcon from '../../assets/svg/checkmark.svg?react';
import FreeTrialIcon from '../../assets/svg/freeAccess.svg?react';
import { useFirstLoad } from "../../hooks/firstLoad";
import { usePayment } from "../../hooks/usePayment";
import { useThemeColor } from "../../hooks/useThemeColor";
import Loader from "../../components/Loader";
import { useLoopVibration } from "../../hooks/useVibration";

const OnboardingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useFirstLoad();
  useThemeColor('#102946');
  const { buttonRef } = useLoopVibration();
  
  const [isOnboardCompleted] = useLocalStorage(IS_ONBOARD_COMPLETED, false);
  const [selected, setSelected] = useState<'2' | '4' | null>('2');
  const [freeTrial, setFreeTrial] = useState<boolean>(false);

  const { onPayment, isLoading} = usePayment(Number(selected), freeTrial);

  const onClose = () => {
    isOnboardCompleted ? navigate(-1) : navigate('/onboarding/info');
  };

  const urlOk = encodeURIComponent('https://hide-vpn.com?payment-success=true');
  const urlFail = encodeURIComponent('https://hide-vpn.com?payment-success=false');
  const paymentLink = `https://ray.yourmessage.me/v1.0/user/billing/flow/web/yookassa/subscription/create?subscriptionId=${1}&pwaId=${123}&clickId=${123}&onesignalID=${123}&source=pwa&urlOk=${urlOk}&urlFail=${urlFail}`;

  return (
    <div className="relative min-h-dvh bg-darkBlue text-[clamp(14px,4vw,18px)]">
      {isLoading && <Loader />}
       <div
        className="absolute top-0 left-0 w-full h-[40dvh] bg-[url('/png/paywall.png')] bg-repeat bg-[length:110vw] animate-scrollUp pointer-events-none"
        aria-hidden="true"
      />
        <div className="relative z-10 px-[clamp(20px,5vw,32px)] flex flex-col items-center justify-start min-h-dvh pt-[clamp(16px,4dvh,56px)] pb-[clamp(20px,6dvh,56px)] max-w-[480px] mx-auto">
          <div className="w-full flex items-center">
            <button onClick={onClose} className="opacity-50" data-ignore-vibrate>
              <CloseIcon className="w-[clamp(28px,8vw,36px)] h-auto" />
            </button>
          </div>
    
    <div className="flex flex-1 flex-col items-center justify-end">
      <div className="bg-meltedWhite/80 p-[clamp(20px,5vw,32px)] border-[2px] border-[#5D768A] backdrop-blur-xs shadow-[0_0_7px_rgba(0,0,0,0.25)] rounded-3xl rounded-br-none rounded-bl-none w-full text-center">
        <h1 className="text-white font-bold leading-tight text-[clamp(24px,6.5vw,32px)] mb-[clamp(12px,3vw,16px)]">
          {t('onboarding.header')}
        </h1>
      </div>
  
      <div className="-mt-[clamp(20px,5vw,32px)] bg-customBlack px-[clamp(20px,5vw,32px)] py-[clamp(20px,5vw,28px)] rounded-3xl w-full text-left z-20">
        <ul className="space-y-[clamp(14px,4vw,20px)]">
          {ADVANTAGES_LIST.map(({ text, Icon }) => (
            <li key={text} className="flex items-center justify-between">
              <div className="flex items-center gap-[clamp(8px,2.5vw,12px)]">
                <Icon className="w-[clamp(20px,6vw,28px)] h-[clamp(20px,6vw,28px)]" />
                <span className="text-white">
                  {t(`onboarding.${text}`)}
                </span>
              </div>
              <CheckmarkIcon className="w-[clamp(18px,6vw,26px)] h-[clamp(20px,6vw,28px)]" />
            </li>
          ))}
        </ul>
      </div>
  
      <div className="mt-[clamp(24px,6vw,32px)] w-full z-20 space-y-[clamp(16px,4vw,24px)]">
        <div className={`
            flex items-center justify-between rounded-full h-[clamp(48px,7dvh,56px)] px-[clamp(20px,5vw,28px)] border-2
            ${freeTrial ? ' bg-deepGreen border-borderGreen' : 'bg-transparent border-white'}
          `}>
            <div className="flex flex-col items-start justify-center">
              <span className="text-white font-semibold">
                {t(freeTrial ? 'onboarding.freeTrial' : 'onboarding.activateFreeTrial')}
              </span>
              {freeTrial && (
              <div className="flex items-center">
               <FreeTrialIcon className='w-[clamp(10px, 3vw, 12px] h-[clamp(10px, 3vw, 12px]' />
                <span className="text-white text-[clamp(10px,4vw,12px)] ml-1">
                  {t(freeTrial ? 'onboarding.freeTrialTip' : 'onboarding.activateFreeTrial')}
                </span>
                </div>
               )}
            </div>
          <label className="relative inline-block w-11 h-6">
            <input type="checkbox" className="sr-only peer" checked={freeTrial} onChange={() => setFreeTrial((prev) => !prev)}/>
            <div className="w-full h-full bg-buttonGrey rounded-full peer-checked:bg-lightGreen transition-colors" />
            <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full" />
          </label>
        </div>
  
        {[{
          id: '4',
          label: t('onboarding.weekPlan'),
          price: `250₽ / ${t('onboarding.week')}`,
          freeTrialLabel: t('onboarding.freeTrialWeekLabel'),
          freeTrialPrice:  `${t('onboarding.later')} 250₽ / ${t('onboarding.week')}`,
        }, {
          id: '2',
          label: t('onboarding.yearPlan'),
          price: `166₽ ${t('onboarding.inMonth')}`,
          freeTrialLabel: t('onboarding.freeTrialYearLabel'),
          freeTrialPrice: `166₽ ${t('onboarding.inMonth')}`,
          badge: `2000₽ / ${t('onboarding.year')}`,
          isBestPrice: true,
        }].map(({ id, label, price, freeTrialLabel, freeTrialPrice, badge, isBestPrice}) => (
          <label key={id} className={`
            flex items-center h-[clamp(48px,7dvh,56px)] px-[clamp(20px,5vw,28px)] border-2 rounded-full relative
            ${selected === id ? 'border-lightBlue bg-hoveredBlue' : 'border-white bg-transparent'}
          `}>
              {isBestPrice && (
               <div className="absolute top-[-10px] right-[clamp(20px,5vw,28px)] bg-lightGreen text-black text-[clamp(10px,2.5vw,12px)] px-2 py-[2px] rounded-full">
                  {t('onboarding.bestPrice')}
               </div>
              )}
            <div className="flex items-center justify-between w-full">
              <div className='flex items-center'>
                <input
                  type="radio"
                  name="custom-radio"
                  className="sr-only peer"
                  checked={selected === id}

                  // @ts-ignore
                  onChange={() => setSelected(id)}
                />
                <div className="w-[clamp(20px,4.5vw,24px)] h-[clamp(20px,4.5vw,24px)] rounded-full border-2 border-secondaryGrey peer-checked:border-lightBlue flex items-center justify-center">
                  {selected === id && (
                    <div className="w-[clamp(10px,3.5vw,14px)] h-[clamp(10px,3.5vw,14px)] rounded-full bg-lightBlue" />
                  )}
                </div>
                <div className="flex flex-col items-start justify-center ml-[clamp(8px,2.5vw,12px)]"> 
                  <span className="text-white">{freeTrial ? freeTrialLabel : label}</span>
                  {badge && <span className="text-white text-[clamp(12px,4.5vw,14px)]" >{badge}</span>}
                </div>
              </div>
                <span className="text-white text-[clamp(12px,4.5vw,14px)] text-medium">{freeTrial ? freeTrialPrice : price}</span>
            </div>
          </label>
        ))}
      </div>
      <a href={paymentLink} target="_blank" rel="noopener noreferrer">
        Открыть оплату в браузере
      </a>
      <button
        ref={buttonRef}
        onClick={onPayment}
        className="w-full h-[clamp(52px,8dvh,56px)] text-white text-[clamp(14px,4.5vw,18px)] bg-lightPurple mt-[clamp(28px,6vw,36px)] rounded-lg"
      >
        {t('common.continue')}
      </button>
    </div>
    </div>
  </div>
  );
};

export default OnboardingPage;
