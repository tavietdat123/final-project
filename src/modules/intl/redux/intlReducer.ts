import { createSlice } from '@reduxjs/toolkit';
import { LS_LANG } from '../constants';
export interface IntlState {
  readonly locale: string;
}
const currentLang = localStorage.getItem(LS_LANG);
const initialState: IntlState = { locale: currentLang ?? 'vi' };
const intlSlice = createSlice({
  name: 'intl',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      localStorage.setItem(LS_LANG, action.payload);
      state.locale = action.payload;
    },
  },
});
export default intlSlice.reducer;
export const { setLocale } = intlSlice.actions;
