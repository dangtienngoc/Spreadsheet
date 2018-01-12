import { ADD_COLUMN, ADD_ROW } from './constains';
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
