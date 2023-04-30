import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [], // Danh sách các reducer mà bạn muốn lưu trữ trạng thái của chúng
};
export const history = createBrowserHistory();
const middleware = [...getDefaultMiddleware(), thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});
export const persistor = persistStore(store);
