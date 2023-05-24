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
export const getEmployeeByIdService = (number: string) => {
  return axios.get(API_PATHS.employee + '/' + number, {
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
export const getMarriageService = () => {
  return axios.get(API_PATHS.marriage, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
export const getPositionService = () => {
  return axios.get(API_PATHS.position, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
export const getDepartmentService = () => {
  return axios.get(API_PATHS.department, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
export const getDefaultSalaryService = () => {
  return axios.get(API_PATHS.getDefaultSalary, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
export const getBenefitService = () => {
  return axios.get(API_PATHS.benefit, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
export const getGradeService = () => {
  return axios.get(API_PATHS.grade, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};

export const addEmployeeService = (data: any) => {
  return axios.post(API_PATHS.employee, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
export const searchEmployeeService = (data: string) => {
  return axios.get(API_PATHS.searchEmployee + data, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
export const contractSaveMultipleService = (formData: any) => {
  return axios.post(API_PATHS.contractSaveMultiple, formData, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const uploadEmployeeDocumentService = (formData: any) => {
  return axios.post(API_PATHS.employeeDocument, formData, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const deleteEmployeeService = (formData: any) => {
  return axios.delete(API_PATHS.deleteEmployee, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
    data: {
      record_ids: formData,
    },
  });
};
export const updateEmployeeService = (data: any, id: number) => {
  return axios.put(API_PATHS.employee + '/' + id, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}`,
    },
  });
};
