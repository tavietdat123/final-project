import { combineReducers } from '@reduxjs/toolkit';
import { History } from 'history';
import intlSlice, { IntlState } from '../modules/intl/redux/intlReducer';

export interface AppState {
  intl: IntlState;
}

export default function rootReducer(history: History) {
  return combineReducers({
    intl: intlSlice.reducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
