import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../configs/routes';
import PrivateRoute from '../modules/common/components/PrivateRoute';
import AuthRoute from '../modules/common/components/AuthRoute';
import { Backdrop, CircularProgress } from '@mui/material';

const LoginPage = lazy(() => import('../modules/auth/pages/LoginPage'));
const HomePage = lazy(() => import('../modules/Home/page'));
const ForgotPasswordPage = lazy(() => import('../modules/auth/pages/ForgotPasswordPage'));
const NotFound = lazy(() => import('../modules/notFound/NotFoundPage'));
const EmployeePage = lazy(() => import('../modules/employee/page/EmployeePage'));
const ChangePassword = lazy(() => import('../modules/auth/pages/ChangePassword'));
const CreateOrUpdateEmployeePage = lazy(() => import('../modules/employee/page/CreateOrUpdateEmployeePage'));
const Loading = () => (
  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
    <CircularProgress color="inherit" />
  </Backdrop>
);
export const RootRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path={ROUTES.login}
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path={ROUTES.forgotPassword}
          element={
            <AuthRoute>
              <ForgotPasswordPage />
            </AuthRoute>
          }
        />
        <Route
          path={ROUTES.home}
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.employee}
          element={
            <PrivateRoute>
              <EmployeePage />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.changePassword}
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path={ROUTES.createOrUpdateEmployee}
          element={
            <PrivateRoute>
              <CreateOrUpdateEmployeePage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${ROUTES.createOrUpdateEmployee}/:id`}
          element={
            <PrivateRoute>
              <CreateOrUpdateEmployeePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
