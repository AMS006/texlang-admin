import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './redux/store';
import FileDataProvider from './context/FileContext';
import './index.css';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FileDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FileDataProvider>
    </Provider>
  </React.StrictMode>
);

