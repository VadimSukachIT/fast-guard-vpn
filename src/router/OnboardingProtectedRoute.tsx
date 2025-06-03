import { IS_ONBOARD_COMPLETED } from '../constants';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

type Props = {
  children: React.ReactNode;
};

const OnboardingProtectedRoute = ({ children }: Props) => {
  const [isOnboardingCompleted] = useLocalStorage(IS_ONBOARD_COMPLETED, false)

  if (isOnboardingCompleted) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default OnboardingProtectedRoute;