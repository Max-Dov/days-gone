import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@features';
import 'commonStyles/base.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <App/>,
  // <React.StrictMode><App/></React.StrictMode>,
);
