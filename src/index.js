import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Spreadsheet from './Spreadsheet';
import registerServiceWorker from './registerServiceWorker';

const column = [
  { id: 'k1', type: 'Number', title: 'Number' },
  { id: 'k2', type: 'Number', title: 'Number' },
  { id: 'k3', type: 'Sum', title: 'Sum', column: 'k1', column2: 'k2' },
  { id: 'k4', type: 'Dropdown', title: 'Dropdown' },
];

const data = [
  { k1: 1, k2: 1, k3: '', k4: '3' },
  { k1: 2, k2: 2, k3: '', k4: '3' },
  { k1: 1, k2: 1, k3: '', k4: '3' },
  { k1: 1, k2: 1, k3: '', k4: '3' },
];

const Root = () => <App>
  <Spreadsheet column={column} data={data} />
</App>;

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
