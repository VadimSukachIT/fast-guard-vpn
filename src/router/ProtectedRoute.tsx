import { useEffect, useState } from 'react';
import { IS_ONBOARD_COMPLETED, IS_PREMIUM_PURCHASED } from '../constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useModal } from '../context/ModalContext';
import SuccessPaymentModal from '../components/SuccessPaymentModal';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { showModal } = useModal()
  const [isInitialized, setInitialized] = useState(false)
  const [query, setQuery] = useSearchParams();
  const [isOnboardingFinished] = useLocalStorage(IS_ONBOARD_COMPLETED, false)
  const [isPremiumPurchased, setIsPremiumPurchased] = useLocalStorage(IS_PREMIUM_PURCHASED, false);
  const navigate = useNavigate()

  const checkSuccessPayment = () => {
    if (isPremiumPurchased) return false;

    if (query.get("payment-success")) {
      const isSuccess = query.get("payment-success") === "true"
      return isSuccess;
    }
  }
 
  useEffect(() => {
    if (checkSuccessPayment()) {
      setIsPremiumPurchased(true);
      if (!isOnboardingFinished) {
        navigate('/onboarding/info');
        showModal(<SuccessPaymentModal />);
      } else {
        setQuery(new URLSearchParams())
        setInitialized(true);
        showModal(<SuccessPaymentModal />);
      }
    } else if (!isOnboardingFinished) {
        navigate('/onboarding')
    } else {
      setInitialized(true)
    }
  }, [])

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;