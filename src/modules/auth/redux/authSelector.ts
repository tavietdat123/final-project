import { AppState } from '../../../redux/reducer';

export const loadingAuthSelector = (state: AppState) => state.auth.loading;
export const detailUserSelector = (state: AppState) => state.auth.detailUser;
