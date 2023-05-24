import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { changePassWordService, forgotPasswordService, getDetailUser, getTokenUser } from '../authService';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { push } from 'redux-first-history';
import toastMessage from '../../../component/toast/Toast';
export interface initialStateAuth {
  loading: boolean;
  detailUser: any;
  loadingForgot: boolean;
}
const initialState: initialStateAuth = {
  loading: false,
  detailUser: {},
  loadingForgot: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getToken.fulfilled, (state, action: any) => {
        state.loading = false;
        Cookies.set(ACCESS_TOKEN_KEY, action.payload.data.token);
      })
      .addCase(getToken.rejected, (state, action: any) => {
        state.loading = false;
        toastMessage('error', action.payload.message);
      })
      .addCase(getDetail.fulfilled, (state, action) => {
        state.detailUser = action.payload.data;
      })
      .addCase(changePassWord.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassWord.fulfilled, (state, action: any) => {
        state.loading = false;
        toastMessage('success', action.payload.message);
      })
      .addCase(changePassWord.rejected, (state, action: any) => {
        state.loading = false;
        toastMessage('error', action.payload.message);
      })
      .addCase(forgotPassWord.pending, (state) => {
        state.loadingForgot = true;
      })
      .addCase(forgotPassWord.fulfilled, (state, action: any) => {
        state.loadingForgot = false;
        toastMessage('success', 'Please check your email and change your password');
      })
      .addCase(forgotPassWord.rejected, (state, action: any) => {
        state.loadingForgot = false;
        toastMessage('error', action.payload.message);
      });
  },
});
export const getToken = createAsyncThunk<void, any, {}>(
  'auth/gettoken',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await getTokenUser(data);
      if (res) {
        dispatch(push(ROUTES.home));
      }
      return res.data;
    } catch (err: any) {
      const error = err.response.data;
      return rejectWithValue(error);
    }
  },
);
export const getDetail = createAsyncThunk('auth/getdetail', async () => {
  try {
    const res = await getDetailUser();
    return res.data;
  } catch (err: any) {
    console.log(err);
  }
});
export const changePassWord = createAsyncThunk<void, any, {}>(
  'auth/changepassword',
  async (data, { rejectWithValue }) => {
    try {
      const res = await changePassWordService(data);
      return res.data;
    } catch (err: any) {
      const error = err.response.data;
      return rejectWithValue(error);
    }
  },
);
export const forgotPassWord = createAsyncThunk<void, any, {}>(
  'auth/forgotpassWord',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await forgotPasswordService(data);
      dispatch(push(ROUTES.login));
      return res.data;
    } catch (err: any) {
      const error = err.response.data;
      return rejectWithValue(error);
    }
  },
);
export const { logoutAuth } = authSlice.actions;
export default authSlice.reducer;
