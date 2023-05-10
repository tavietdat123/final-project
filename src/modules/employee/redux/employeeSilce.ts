import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getEmployeeByPageService, getEmployeeService } from '../employeeService';
export interface InitialState {
  employee: any;
  loadingEmployee: boolean;
  firstPage: string;
  lastPage: string;
  listPage: any[];
  nextPage: string;
  prevPage: string;
  totalPage: number | null;
  currentPage: number | null;
  fromPage: number | null;
  toPage: number | null;
  totalEmployee: number | null;
}
const initialState: InitialState = {
  employee: [],
  loadingEmployee: false,
  firstPage: '',
  lastPage: '',
  nextPage: '',
  prevPage: '',
  listPage: [],
  totalPage: null,
  currentPage: null,
  fromPage: null,
  toPage: null,
  totalEmployee: null,
};
const employeeSilce = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployee.pending, (state) => {
        state.loadingEmployee = true;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.loadingEmployee = false;
        state.employee = action.payload.data.data;
        state.nextPage = action.payload.data.next_page_url;
        state.prevPage = action.payload.data.prev_page_url;
        state.firstPage = action.payload.data.first_page_url;
        state.lastPage = action.payload.data.last_page_url;
        state.listPage = action.payload.data.links;
        state.totalPage = action.payload.data.last_page;
        state.currentPage = action.payload.data.current_page;
        state.fromPage = action.payload.data.from;
        state.toPage = action.payload.data.to;
        state.totalEmployee = action.payload.data.total;
      })
      .addCase(getEmployeeByPage.pending, (state) => {
        state.loadingEmployee = true;
      })
      .addCase(getEmployeeByPage.fulfilled, (state, action) => {
        state.loadingEmployee = false;
        state.employee = action.payload.data.data;
        state.nextPage = action.payload.data.next_page_url;
        state.prevPage = action.payload.data.prev_page_url;
        state.firstPage = action.payload.data.first_page_url;
        state.lastPage = action.payload.data.last_page_url;
        state.listPage = action.payload.data.links;
        state.totalPage = action.payload.data.last_page;
        state.currentPage = action.payload.data.current_page;
        state.fromPage = action.payload.data.from;
        state.toPage = action.payload.data.to;
        state.totalEmployee = action.payload.data.total;
      });
  },
});
export const getEmployee = createAsyncThunk('employee/getemployee', async () => {
  try {
    const res = await getEmployeeService();
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const getEmployeeByPage = createAsyncThunk('employee/getemployeebypage', async (data: string) => {
  try {
    const res = await getEmployeeByPageService(data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export default employeeSilce.reducer;
