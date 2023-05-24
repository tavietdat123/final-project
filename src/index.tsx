import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/globalStyle.scss';
import { Provider } from 'react-redux';
import { store, persistor, history } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ConnectedIntlProvider from './modules/intl/component/ConnectedIntlProvider';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { ThemeProvider } from '@mui/material/styles';
import theme from './component/themeMui';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <ConnectedIntlProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ConnectedIntlProvider>
      </Router>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
