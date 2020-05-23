import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

// providers
import HospitalsProvider from './providers/HospitalsProvider';
import ProductsProvider from './providers/ProductsProvider';
import UserProvider from './providers/UserProvider';
import LocaleProvider from "./providers/LocaleProvider";

import './index.scss';

ReactDOM.render(
  <Router>
    <UserProvider>
      <LocaleProvider>
        <HospitalsProvider>
          <ProductsProvider>
            <App />
          </ProductsProvider>
        </HospitalsProvider>
      </LocaleProvider>
    </UserProvider>
  </Router>,
  document.getElementById('root')
);

