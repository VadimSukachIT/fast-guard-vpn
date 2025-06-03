import { useNavigate } from "react-router"
import { useLocalStorage } from "usehooks-ts";
import { useTranslation } from "react-i18next";

import Header from "../../../components/Header"
import Promo from "../../../components/Promo"
import { IS_PREMIUM_PURCHASED } from "../../../constants"
import MailIcon from '../../../assets/svg/mail.svg?react';
import NotificationIcon from '../../../assets/svg/notification.svg?react';
import UnsubscribeIcon from '../../../assets/svg/unsubscribe.svg?react';
import ArrowRightIcon from '../../../assets/svg/arrow-right.svg?react';
import { useThemeColor } from '../../../hooks/useThemeColor';
import { useNotificationsSettings } from "../../../hooks/useNotificationsSettings";

const SettingsPage = () => {
  const [isPremiumPurchased] = useLocalStorage(IS_PREMIUM_PURCHASED, false)
  const { toggleNotifications, isEnabled } = useNotificationsSettings();
  useThemeColor();
  
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onGoBack = () => navigate(-1);

  return (
    <div className="min-h-dvh bg-lightGrey px-[clamp(16px,4vw,24px)] pb-[clamp(20px,6dvh,56px)]">
      <Header onClick={onGoBack} title={t('settings.title')} />

      {!isPremiumPurchased && <Promo />}

      <div className="flex flex-col gap-[clamp(10px,2.5vw,16px)] mt-[clamp(12px,3vw,20px)]">
        {/* Контакты */}
        <div className="bg-white rounded-3xl p-[clamp(14px,4vw,20px)] flex items-center justify-between">
          <div className="flex items-center gap-[clamp(10px,3vw,16px)]">
            <MailIcon className="w-[clamp(24px,8vw,32px)] h-[clamp(24px,8vw,32px)]" />
            <span className="text-[clamp(14px,4vw,18px)]">{t('settings.contactUs')}</span>
          </div>
          <ArrowRightIcon className="w-[clamp(16px,4vw,24px)] h-[clamp(16px,4vw,24px)]" />
        </div>

        {/* Уведомления */}
        <div className="bg-white rounded-3xl p-[clamp(14px,4vw,20px)] flex items-center justify-between">
          <div className="flex items-center gap-[clamp(10px,3vw,16px)]">
            <NotificationIcon className="w-[clamp(24px,8vw,32px)] h-[clamp(24px,8vw,32px)]" />
            <span className="text-[clamp(14px,4vw,18px)]">{t('settings.notifications')}</span>
          </div>
          <label className="relative inline-block w-11 h-6">
            <input 
              type="checkbox" 
              className="sr-only peer"   
              checked={isEnabled}
              onChange={toggleNotifications}
            />
            <div className="w-full h-full bg-buttonGrey rounded-full peer-checked:bg-lightGreen transition-colors" />
            <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full" />
          </label>
        </div>

        {/* Отписка */}
        <div className="bg-white rounded-3xl p-[clamp(14px,4vw,20px)] flex items-center justify-between">
          <div className="flex items-center gap-[clamp(10px,3vw,16px)]">
            <UnsubscribeIcon className="w-[clamp(24px,8vw,32px)] h-[clamp(24px,8vw,32px)]" />
            <span className="text-[clamp(14px,4vw,18px)]">{t('settings.unsubscribe')}</span>
          </div>
          <ArrowRightIcon className="w-[clamp(16px,4vw,24px)] h-[clamp(16px,4vw,24px)]" />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage;
