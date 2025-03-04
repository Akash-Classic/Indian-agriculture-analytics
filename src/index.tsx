import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MantineProvider } from '@mantine/core';

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        /** Put your mantine theme override here */
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
