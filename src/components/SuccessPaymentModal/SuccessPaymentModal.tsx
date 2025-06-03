import { useModal } from '../../context/ModalContext';

const SuccessPaymentModal = () => {
  const { hideModal } = useModal();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-[clamp(20px,5vw,40px)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[clamp(56px,12vw,72px)] h-[clamp(56px,12vw,72px)] text-green-500 mb-[clamp(16px,4vw,24px)]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM10 17.414l-4.707-4.707 1.414-1.414L10 14.586l7.293-7.293 1.414 1.414L10 17.414z" />
      </svg>

      <h2 className="text-[clamp(20px,5.5vw,26px)] font-bold mb-[clamp(8px,2.5vw,16px)]">
        Оплата прошла успешно!
      </h2>

      <p className="text-[clamp(16px,4.5vw,18px)] text-gray-600 mb-[clamp(20px,5vw,32px)] max-w-[420px]">
        Спасибо за ваш заказ. Мы уже готовим ваш доступ.
      </p>

      <button
        onClick={hideModal}
        className="h-[clamp(44px,6vh,54px)] px-[clamp(32px,7vw,48px)] text-[clamp(14px,4.5vw,18px)] bg-heavyBlue text-white rounded-md font-medium"
      >
        Закрыть
      </button>
    </div>
  );
};

export default SuccessPaymentModal;
