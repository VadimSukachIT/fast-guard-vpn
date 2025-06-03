import { useTranslation } from "react-i18next";
import CloseIcon from '../../assets/svg/close2.svg?react';

const NotificationPrompt = ({
  onSubscribe,
  onClose,
}: {
  onSubscribe: () => void;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="relative w-full max-w-[500px] mx-auto bg-white rounded-t-[24px] px-[clamp(16px,4vw,32px)] pt-[clamp(16px,5dvh,20px)] pb-[clamp(16px,10vh,64px)] shadow-lg animate-slideUp">
        <div className="w-full py-2 px-2 flex justify-end items-center">
        <button onClick={onClose} className="w-[clamp(16px,7vw,24px)] h-[clamp(16px,7vw,24px)]">
          <CloseIcon className="w-[clamp(16px,5vw,20px)] h-auto" />
        </button>
        </div>
        <img src="/svg/notifications.svg" className="w-full h-auto"/>
        <h2 className="text-[clamp(18px,5vw,24px)] font-bold text-center leading-snug mb-3">
          {t('notifications.acceptTitle')}
        </h2>
        <p className="text-[clamp(14px,4vw,16x)] text-textGrey text-center leading-relaxed">
         {t('notifications.acceptMessage')}
        </p>


        <div className="mt-6 flex w-full">
          <button
            onClick={onSubscribe}
            className="w-full rounded-lg bg-lightPurple text-white text-[clamp(14px,4vw,16px)] font-medium py-[clamp(12px,3vw,16px)]"
          >
             {t('notifications.enable')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPrompt;
