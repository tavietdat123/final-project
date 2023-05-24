import { APIHost } from '../utils/constants';
export const API_PATHS = {
  signIn: `${APIHost}/login`,
  userDetail: `${APIHost}/user/detail`,
  changePassWord: `${APIHost}/change-password`,
  employee: `${APIHost}/employee`,
  marriage: `${APIHost}/marriage`,
  position: `${APIHost}/position`,
  department: `${APIHost}/department`,
  getDefaultSalary: `${APIHost}/employee/get-default-salary`,
  grade: `${APIHost}/grade`,
  benefit: `${APIHost}/benefit`,
  searchEmployee: `${APIHost}/employee?search=`,
  contractSaveMultiple: `${APIHost}/contract/save-multiple`,
  employeeDocument: `${APIHost}/employee-document/upload`,
  deleteEmployee: `${APIHost}/employee/multiple-delete`,
  forgotPassword: `${APIHost}/forgot-password`,
};
