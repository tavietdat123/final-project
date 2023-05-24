import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import { createReduxHistoryContext } from 'redux-first-history';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
});

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
  thunk,
  routerMiddleware,
];
const persistedReducer = persistReducer(persistConfig, rootReducer(routerReducer));

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});
export const history = createReduxHistory(store);
export const persistor = persistStore(store);
