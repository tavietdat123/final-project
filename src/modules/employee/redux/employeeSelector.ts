import { AppState } from '../../../redux/reducer';

export const loadingEmployeeSelector = (state: AppState) => state.employee.loadingEmployee;
export const employeeSelector = (state: AppState) => state.employee.employee;
export const nextPageEmployeeSelector = (state: AppState) => state.employee.nextPage;
export const prevPageEmployeeSelector = (state: AppState) => state.employee.prevPage;
export const firstPageEmployeeSelector = (state: AppState) => state.employee.firstPage;
export const lastPageEmployeeSelector = (state: AppState) => state.employee.lastPage;
export const listPageEmployeeSelector = (state: AppState) => state.employee.listPage;
export const totalPageEmployeeSelector = (state: AppState) => state.employee.totalPage;
export const currentPageEmployeeSelector = (state: AppState) => state.employee.currentPage;
export const fromPageEmployeeSelector = (state: AppState) => state.employee.fromPage;
export const toPageEmployeeSelector = (state: AppState) => state.employee.toPage;
export const totalEmployeeSelector = (state: AppState) => state.employee.totalEmployee;
