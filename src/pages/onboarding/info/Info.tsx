import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLocalStorage } from "usehooks-ts";

import { ONBOARDING_STEPS } from '../constants';
import { IS_ONBOARD_COMPLETED, IS_PREMIUM_PURCHASED } from "../../../constants";
import { useThemeColor } from '../../../hooks/useThemeColor';

const OnboardingInfoPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isPremiumPurchased] = useLocalStorage(IS_PREMIUM_PURCHASED, false);
  const [, setOnboardingCompleted] = useLocalStorage(IS_ONBOARD_COMPLETED, false);
  const [step, setStep] = useState(0);
  useThemeColor();

  const next = () => {
    if (step < ONBOARDING_STEPS.length - 1) {
      setStep(step + 1);
    } else if (isPremiumPurchased) {
      setOnboardingCompleted(true);
      navigate('/');
    } else {
      setOnboardingCompleted(true);
      navigate('/onboarding/discount');
    }
  };

  const Icon = ONBOARDING_STEPS[step].Icon;

  return (
    <div className="min-h-dvh bg-lightGrey flex flex-col items-center justify-end text-center overflow-hidden px-[clamp(20px,5vw,32px)] pb-[clamp(20px,6dvh,56px)] text-[clamp(14px,4vw,18px)]">
    <div className="flex flex-col justify-center items-center w-full max-w-[480px] relative">
      <div className="mt-[clamp(24px,6dvh,32px)] backdrop-blur-39px bg-lightGrey flex flex-col items-center justify-center w-full">
        <Icon className="w-[80vw] h-auto max-h-[45dvh]" />
        <div className="mt-[clamp(16px,4vw,24px)] text-center">
          <h2 className="text-[clamp(22px,6vw,32px)] font-bold text-black leading-tight">
            {t(`onboarding.info.${ONBOARDING_STEPS[step].title}`)}
          </h2>
          <p className="text-textGrey mt-[clamp(14px,3vw,20px)] text-[clamp(14px,4vw,18px)] leading-snug">
            {t(`onboarding.info.${ONBOARDING_STEPS[step].description}`)}
          </p>
        </div>
      </div>
    </div>
  
    <div className="flex gap-[clamp(6px,2vw,10px)] mt-[clamp(32px,6vh,40px)] mb-[clamp(28px,8vh,40px)]">
      {ONBOARDING_STEPS.map((_, i) => (
        <div
          key={i}
          className={`h-[clamp(8px,2vw,10px)] w-[clamp(24px,5vw,28px)] rounded-full transition-all duration-200 ${
            step >= i ? 'bg-lightPurple' : 'bg-limeGrey'
          }`}
        />
      ))}
    </div>
  
    <button
      onClick={next}
      className="w-full max-w-[480px] h-[clamp(52px,8dvh,56px)] bg-lightPurple text-white text-[clamp(14px,4.5vw,18px)] rounded-lg"
    >
      {step < ONBOARDING_STEPS.length - 1 ? t('common.continue') : t('common.start')}
    </button>
  </div>
  
  );
};

export default OnboardingInfoPage;
