import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../configs/routes';
import PrivateRoute from '../modules/common/components/PrivateRoute';

const LoginPage = lazy(() => import('../modules/auth/pages/LoginPage'));
const HomePage = lazy(() => import('../modules/Home/page'));

export const RootRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route
            path={ROUTES.home}
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
