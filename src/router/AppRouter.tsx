import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/home/Home";
import Onboarding from "../pages/onboarding/Onboarding";
import OnboardingInfo from "../pages/onboarding/info";
import OnboardingDiscount from "../pages/onboarding/discount";
import Servers from "../pages/home/servers";
import OnboardingLayout from "../pages/onboarding/Layout";

import PremiumProtectedRoute from "./PremiumProtectedRoute";
import Settings from "../pages/home/settings";
import ConnectionError from "../pages/home/connectionError";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/onboarding" element={<OnboardingLayout />}>
        <Route index element={
          <PremiumProtectedRoute>
            <Onboarding />
          </PremiumProtectedRoute>
          } />
        <Route path="info" element={
            <OnboardingInfo />
        }/>
        <Route path="discount" element={
            <OnboardingDiscount />
          }/>
        <Route element={<Navigate to="/onboarding" />} />
      </Route>
      <Route
        path="/servers"
        element={
          <ProtectedRoute>
            <Servers />
          </ProtectedRoute>
        }
      />
        <Route
          path="/connection-error"
          element={
          <ProtectedRoute>
            <ConnectionError />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        index
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
     <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;