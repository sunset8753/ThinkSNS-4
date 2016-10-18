import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// load style
import './styles/app.scss';

// load router, run application.
import App from './src/Root.js';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <App />,
    document.getElementById('app')
  );
});
