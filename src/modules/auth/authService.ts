import { forgotPassWord } from './redux/authSlice';
import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import { FormDataSignin } from './pages/LoginPage';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../utils/constants';
import { FormDataChangePass } from './pages/ChangePassword';

export const getTokenUser = (data: FormDataSignin) => {
  return axios.post(API_PATHS.signIn, data);
};
export const getDetailUser = () => {
  return axios.get(API_PATHS.userDetail, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
export const changePassWordService = (data: FormDataChangePass) => {
  return axios.post(API_PATHS.changePassWord, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
export const forgotPasswordService = (data: { email: string }) => {
  return axios.post(API_PATHS.forgotPassword, data);
};
