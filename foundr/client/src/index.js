import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import App from './containers/App';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
