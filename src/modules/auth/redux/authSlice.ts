import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { changePassWordService, getDetailUser, getTokenUser } from '../authService';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { push } from 'redux-first-history';
import toastMessage from '../../../component/toast/Toast';
export interface initialStateAuth {
  loading: boolean;
  detailUser: any;
}
const initialState: initialStateAuth = {
  loading: false,
  detailUser: {},
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await changePassWordService(data);
      console.log(res.data);
      return res.data;
    } catch (err: any) {
      const error = err.response.data;
      return rejectWithValue(error);
    }
  },
);
export default authSlice.reducer;
