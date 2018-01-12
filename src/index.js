import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Spreadsheet from './containers/Spreadsheet';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

let store = createStore(reducers);

const Root = () => (
  <Provider store={store}>
    <App>
      <Spreadsheet />
    </App>
  </Provider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
