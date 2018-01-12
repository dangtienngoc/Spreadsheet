import { ADD_COLUMN, ADD_ROW, CHANGE_CELL_DATA } from './constains';
import { guid } from './helper';

export function addRow() {
  return {
    type: ADD_ROW,
  }
}

export function addColumn(values) {
  const id = guid();
  const column = Object.assign({}, { id }, values);
  return {
    type: ADD_COLUMN,
    payload: column,
  }
}

export function setData(rowIndex, key, value) {
  return {
    type: CHANGE_CELL_DATA,
    payload: {
      rowIndex, key, value
    }
  }
}
