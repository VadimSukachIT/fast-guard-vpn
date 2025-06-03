import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import './Promo.css';

const Promo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onPromoClick = () => navigate('/onboarding');

  return (
    <div onClick={onPromoClick} className="relative overflow-hidden w-full max-w-[480px] bg-gradient-to-br from-nightBlue to-skyeBlue text-white rounded-3xl px-[clamp(20px,5vw,28px)] py-[clamp(10px,3vw,20px)]">
      <h2 className="z-2 text-[clamp(18px,5vw,22px)] font-semibold flex items-center gap-[clamp(6px,2vw,10px)] mb-[clamp(10px,3vw,16px)]">
        {t('promo.title')}
        <span className="text-[clamp(12px,3.5vw,14px)] bg-white/20 px-[clamp(8px,2.5vw,12px)] py-[clamp(2px,0.5vw,6px)] rounded-full font-medium">
          Pro+
        </span>
      </h2>
      <p className="z-2 text-[clamp(14px,4vw,18px)] leading-snug text-white/90 mb-[clamp(16px,3vw,24px)]">
        {t('promo.description')}
      </p>
      <button className="z-2 w-full h-[clamp(36px,6dvh,42px)] text-[clamp(14px,4vw,18px)] bg-white text-lightPurple rounded-lg font-medium">
        {t('promo.checkAllTariffs')}
      </button>
    </div>
  );
};

export default Promo;