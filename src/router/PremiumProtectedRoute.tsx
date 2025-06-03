import { IS_ONBOARD_COMPLETED, IS_PREMIUM_PURCHASED } from '../constants';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

type Props = {
  children: React.ReactNode;
};

const PremiumProtectedRoute = ({ children }: Props) => {
  const [isPremiumPurchased] = useLocalStorage(IS_PREMIUM_PURCHASED, false)
  const [isOnboardingCompleted] = useLocalStorage(IS_ONBOARD_COMPLETED, false)

  if (isPremiumPurchased && isOnboardingCompleted) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default PremiumProtectedRoute;