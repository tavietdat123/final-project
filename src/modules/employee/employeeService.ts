import axios from 'axios';
import { API_PATHS } from '../../configs/api';
import { ACCESS_TOKEN_KEY } from '../../utils/constants';
import Cookies from 'js-cookie';

export const getEmployeeService = () => {
  return axios.get(API_PATHS.employee, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
export const getEmployeeByPageService = (data: string) => {
  return axios.get(data, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
