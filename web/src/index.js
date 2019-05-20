import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import Index from './pages/index';
import { setTheme } from './utils/withRoot';
import * as serviceWorker from './serviceWorker';

(() => {
  const theme = localStorage.getItem('theme');

  setTheme(theme);
})();

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
