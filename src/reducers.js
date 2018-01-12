import { ADD_COLUMN, ADD_ROW, CHANGE_CELL_DATA } from './constains';
import concat from "lodash/concat";
import forEach from "lodash/forEach";
import map from "lodash/map";

const initState = {
  column: [
    { id: 'k1', type: 'Number', title: 'Number 1' },
    { id: 'k2', type: 'Number', title: 'Number' },
    { id: 'k3', type: 'Sum', title: 'Sum', column: 'k1', column2: 'k2' },
    { id: 'k4', type: 'Dropdown', title: 'Dropdown' },
  ],
  data: [
    { k1: 1, k2: 1, k3: '', k4: 3 },
    { k1: 2, k2: 2, k3: '', k4: 3 },
    { k1: 1, k2: 1, k3: '', k4: 3 },
    { k1: 1, k2: 1, k3: '', k4: 3 },
  ],
};

const rootReducer = (state = initState, action) => {
  const { data, column   } = state;
  switch (action.type) {
  case ADD_ROW:
    let row = Object.assign({}, data[0]);
    const keys = Object.keys(row);
    forEach(keys, k => {
      row[k] = '';
    });
    const newData  = concat(data, [row]);
    return {
      column,
      data: newData,
    };
  case ADD_COLUMN:
    return {
      data,
      column: concat(column, [action.payload]),
    };
  case CHANGE_CELL_DATA:
    const { rowIndex, key, value } = action.payload;
    return {
      column,
      data: map(data, (d, i) => {
        if (i === rowIndex) {
          return Object.assign({}, d, { [key]: value });
        }
        return d;
      }),
    };
  default:
    return state
  }
};

export default rootReducer;
