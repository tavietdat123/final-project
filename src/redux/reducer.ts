import { combineReducers } from '@reduxjs/toolkit';
import intlSlice, { IntlState } from '../modules/intl/redux/intlReducer';
import authSlice, { initialStateAuth } from '../modules/auth/redux/authSlice';
import employeeSilce, { InitialState } from '../modules/employee/redux/employeeSilce';
export interface AppState {
  intl: IntlState;
  auth: initialStateAuth;
  employee: InitialState;
}

export default function rootReducer(routerReducer: any) {
  return combineReducers({
    router: routerReducer,
    intl: intlSlice,
    auth: authSlice,
    employee: employeeSilce,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
