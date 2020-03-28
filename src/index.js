import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

// providers
import HospitalsProvider from './providers/HospitalsProvider';

import './index.scss';

ReactDOM.render(
  <Router>
    <HospitalsProvider>
      <App />
    </HospitalsProvider>
  </Router>,
  document.getElementById('root')
);

