import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addEmployeeService,
  contractSaveMultipleService,
  deleteEmployeeService,
  getBenefitService,
  getDefaultSalaryService,
  getDepartmentService,
  getEmployeeByIdService,
  getGradeService,
  getMarriageService,
  getPositionService,
  updateEmployeeService,
  uploadEmployeeDocumentService,
} from '../employeeService';
import toastMessage from '../../../component/toast/Toast';
import { push } from 'redux-first-history';
import { ROUTES } from '../../../configs/routes';
import { getEmployee } from './employeeSilce';
import { type } from 'os';
export interface InitialStateManagerEmployee {
  marriage: any;
  position: any;
  department: any;
  defaultSalary: any;
  grade: any;
  benefit: any;
  multipleUpload: any;
  upload: any;
  currentEmployee: any;
  listDeleteUpdate: any;
  loadingAddOrUpdate: boolean;
  listDeleteDocumentUpdate: number[];
  deleteSuccess: boolean;
}
const initialState: InitialStateManagerEmployee = {
  marriage: [],
  position: [],
  department: [],
  defaultSalary: {},
  grade: [],
  benefit: [],
  multipleUpload: [],
  upload: [],
  currentEmployee: {},
  listDeleteUpdate: [],
  listDeleteDocumentUpdate: [],
  loadingAddOrUpdate: false,
  deleteSuccess: false,
};
const managerEmployeeSilce = createSlice({
  name: 'managerEmployee',
  initialState,
  reducers: {
    setMultipleUpload: (state, acion) => {
      if (Array.isArray(acion.payload)) {
        state.multipleUpload = [...state.multipleUpload, ...acion.payload];
      } else {
        state.multipleUpload = [...state.multipleUpload, acion.payload];
      }
    },
    deleteMultipleUpload: (state, acion) => {
      const current = state.multipleUpload.find((el: any, index: number) => index === acion.payload);
      if (current.id) {
        state.listDeleteUpdate = [...state.listDeleteUpdate, current.id];
      }
      state.multipleUpload = state.multipleUpload.filter((el: any, index: number) => index !== acion.payload);
    },
    resetMultipleUpload: (state) => {
      state.multipleUpload = [];
    },
    setUpload: (state, acion) => {
      if (Array.isArray(acion.payload)) {
        state.upload = [...state.upload, ...acion.payload];
      } else {
        state.upload = [...state.upload, acion.payload];
      }
    },
    deleteUpload: (state, acion) => {
      const current = state.upload.find((el: any, index: number) => index === acion.payload);
      if (current.id) {
        state.listDeleteDocumentUpdate = [...state.listDeleteDocumentUpdate, current.id];
      }
      state.upload = state.upload.filter((el: any, index: number) => index !== acion.payload);
    },
    resetUpload: (state) => {
      state.upload = [];
    },
    resetCurrentEmployee: (state) => {
      state.currentEmployee = {};
    },
    resetListDeleteUpdate: (state) => {
      state.listDeleteUpdate = [];
    },
    resetListDeleteDocumentUpdate: (state) => {
      state.listDeleteDocumentUpdate = [];
    },
    resetSuccessDeleteEmployee: (state) => {
      state.deleteSuccess = false;
    },
    logoutEmployeeManage: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMarriage.fulfilled, (state, action) => {
        state.marriage = action.payload.data;
      })
      .addCase(getPosition.fulfilled, (state, action) => {
        state.position = action.payload.data;
      })
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.department = action.payload.data;
      })
      .addCase(getDefaultSalary.fulfilled, (state, action) => {
        state.defaultSalary = action.payload.data;
      })
      .addCase(getGrade.fulfilled, (state, action) => {
        state.grade = action.payload.data;
      })
      .addCase(getBenefit.fulfilled, (state, action) => {
        state.benefit = action.payload.data;
      })
      .addCase(addEmployee.pending, (state, action) => {
        state.loadingAddOrUpdate = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loadingAddOrUpdate = false;
        toastMessage('success', action.payload.message);
      })
      .addCase(addEmployee.rejected, (state, action: any) => {
        state.loadingAddOrUpdate = false;
        toastMessage('error', action.payload.message);
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.currentEmployee = action.payload.data;
      })
      .addCase(getEmployeeById.rejected, (state, action: any) => {
        toastMessage('error', action.payload.message);
      })
      .addCase(deleteMultipleEmployee.fulfilled, (state, action) => {
        toastMessage('success', action.payload.message);
        state.deleteSuccess = true;
      })
      .addCase(deleteMultipleEmployee.rejected, (state, action: any) => {
        toastMessage('error', action.payload.message);
      })
      .addCase(updateEmployee.pending, (state, action) => {
        state.loadingAddOrUpdate = true;
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        toastMessage('success', action.payload.message);
        state.loadingAddOrUpdate = false;
      })
      .addCase(updateEmployee.rejected, (state, action: any) => {
        toastMessage('error', action.payload.message);
        state.loadingAddOrUpdate = false;
      });
  },
});
export const getMarriage = createAsyncThunk('managerEmployee/getmarriage', async () => {
  try {
    const res = await getMarriageService();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const getPosition = createAsyncThunk('managerEmployee/getposition', async () => {
  try {
    const res = await getPositionService();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const getDefaultSalary = createAsyncThunk('managerEmployee/getdefaulsalary', async () => {
  try {
    const res = await getDefaultSalaryService();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const getDepartment = createAsyncThunk('managerEmployee/getdepartment', async () => {
  try {
    const res = await getDepartmentService();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const getGrade = createAsyncThunk('managerEmployee/getgrade', async () => {
  try {
    const res = await getGradeService();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const getBenefit = createAsyncThunk('managerEmployee/getbenefit', async () => {
  try {
    const res = await getBenefitService();
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const addEmployee = createAsyncThunk(
  'managerEmployee/addEmployee',
  async (data: any, { dispatch, rejectWithValue, getState }: any) => {
    try {
      const res = await addEmployeeService(data);
      if (res) {
        const formData = new FormData();
        const fileData = getState().managerEmployee.multipleUpload;
        if (fileData.length !== 0) {
          for (let i = 0; i < fileData.length; i++) {
            const { name, contract_date, document } = fileData[i];
            if (i === 0) {
              formData.append('employee_id', res.data.data.id);
            }
            formData.append('names[]', name);
            formData.append('contract_dates[]', contract_date);
            formData.append('documents[]', document);
          }
          const response = await contractSaveMultipleService(formData);
        }
      }
      if (res) {
        const formData = new FormData();
        const fileData = getState().managerEmployee.upload;
        if (fileData.length !== 0) {
          for (let i = 0; i < fileData.length; i++) {
            const { document } = fileData[i];
            if (i === 0) {
              formData.append('employee_id', res.data.data.id);
            }
            formData.append('documents[]', document);
          }
          const response = await uploadEmployeeDocumentService(formData);
        }
      }
      dispatch(push(ROUTES.employee));
      return res.data;
    } catch (error: any) {
      const err = error.response.data;
      return rejectWithValue(err);
    }
  },
);

export const updateEmployee = createAsyncThunk(
  'managerEmployee/updateemployee',
  async (data: any, { dispatch, rejectWithValue, getState }: any) => {
    try {
      const res = await updateEmployeeService(data, data.id);

      if (res) {
        const formData = new FormData();
        const fileData = getState().managerEmployee.multipleUpload;
        const newFileData = [...fileData].filter((el) => !el.id);
        const listDelete = getState().managerEmployee.listDeleteUpdate;
        formData.append('employee_id', data.id);
        if (newFileData.length !== 0) {
          for (let i = 0; i < fileData.length; i++) {
            const { name, contract_date, document } = fileData[i];
            if (!fileData[i].id) {
              formData.append('names[]', name);
              formData.append('contract_dates[]', contract_date);
              formData.append('documents[]', document);
            }
          }
          for (let i = 0; i < listDelete.length; i++) {
            formData.append('deleted_contracts[]', listDelete[i]);
          }
          const response = await contractSaveMultipleService(formData);
        } else if (fileData.length === 0 && listDelete.length !== 0) {
          formData.append('names[]', '');
          formData.append('contract_dates[]', '');
          formData.append('documents[]', '');
          for (let i = 0; i < listDelete.length; i++) {
            formData.append('deleted_contracts[]', listDelete[i]);
          }
          const response = await contractSaveMultipleService(formData);
        }
      }
      if (res) {
        const formData = new FormData();
        const fileData = getState().managerEmployee.upload;
        const newFileData = [...fileData].filter((el) => !el.id);
        const listDelete = getState().managerEmployee.listDeleteDocumentUpdate;
        formData.append('employee_id', data.id);
        if (newFileData.length !== 0) {
          for (let i = 0; i < fileData.length; i++) {
            const { document } = fileData[i];
            if (!fileData[i].id) {
              formData.append('documents[]', document);
            }
          }
          for (let i = 0; i < listDelete.length; i++) {
            formData.append('deleted_ids[]', listDelete[i]);
          }
          const response = await uploadEmployeeDocumentService(formData);
        } else if (newFileData.length === 0 && listDelete.length !== 0) {
          for (let i = 0; i < listDelete.length; i++) {
            formData.append('deleted_ids[]', listDelete[i]);
          }
          const response = await uploadEmployeeDocumentService(formData);
        }
      }
      dispatch(push(ROUTES.employee));
      return res.data;
    } catch (error: any) {
      const err = error.response.data;
      return rejectWithValue(err);
    }
  },
);

export const getEmployeeById = createAsyncThunk(
  'managerEmployee/getemployeebyid',
  async (data: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await getEmployeeByIdService(data);
      return res.data;
    } catch (error: any) {
      dispatch(push(ROUTES.employee));
      const err = error.response.data;
      return rejectWithValue(err);
    }
  },
);
export const deleteMultipleEmployee = createAsyncThunk(
  'managerEmployee/deletemultipleemployee',
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const res = await deleteEmployeeService(data);
      if (res) {
        dispatch<any>(getEmployee());
      }
      return res.data;
    } catch (error: any) {
      const err = error.response.data;
      return rejectWithValue(err);
    }
  },
);
export const {
  setMultipleUpload,
  deleteMultipleUpload,
  resetMultipleUpload,
  setUpload,
  deleteUpload,
  resetUpload,
  resetCurrentEmployee,
  resetListDeleteUpdate,
  resetListDeleteDocumentUpdate,
  logoutEmployeeManage,
  resetSuccessDeleteEmployee,
} = managerEmployeeSilce.actions;
export default managerEmployeeSilce.reducer;
