import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './state/store';

// components
import App from './views/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
