import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

// providers
import HospitalsProvider from './providers/HospitalsProvider';
import ProductsProvider from './providers/ProductsProvider';

import './index.scss';

ReactDOM.render(
  <Router>
    <HospitalsProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </HospitalsProvider>
  </Router>,
  document.getElementById('root')
);

