import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import {  HashRouter  } from "react-router-dom";

// uncomment so that webpack can bundle styles


render(
  <React.StrictMode>
  <HashRouter>
  {<App />}
  </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
