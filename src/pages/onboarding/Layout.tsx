import { Outlet } from 'react-router-dom';

const OnboardingLayout = () => {
  return (
    <div className="min-h-dvh">
      <Outlet />
    </div>
  );
}

export default OnboardingLayout