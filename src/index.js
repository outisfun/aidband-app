import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

// providers
import HospitalsProvider from './providers/HospitalsProvider';
import ProductsProvider from './providers/ProductsProvider';
import LocaleProvider from "./providers/LocaleProvider";

import './index.scss';

ReactDOM.render(
  <Router>
    <LocaleProvider>
      <HospitalsProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </HospitalsProvider>
    </LocaleProvider>
  </Router>,
  document.getElementById('root')
);

