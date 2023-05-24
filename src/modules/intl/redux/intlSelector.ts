import { AppState } from '../../../redux/reducer';

export const localeSelector = (state: AppState) => state.intl.locale;
