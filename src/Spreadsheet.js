import React, { Component } from 'react';
import PropTypes from 'prop-types';

import set from 'lodash/set';
import get from 'lodash/get';
import map from 'lodash/map';
import concat from 'lodash/concat';

import types from './components';

import './Spreadsheet.css';
import Modal from "./components/Modal";

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

class Spreadsheet extends Component {

  constructor(props) {
    super(props);
    this.state      = {
      data: this.props.data,
      column: this.props.column,
      modal: false,
    };
    this.setValue   = this.setValue.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.addRow     = this.addRow.bind(this);
    this.addColumn  = this.addColumn.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  setValue(rowIndex, key, value) {
    const data = set(this.state.data, `[${rowIndex}.${key}]`, value);
    this.setState({
      data,
    });
  }

  /**
   * Render custom input field in cell
   * @param type (input type)
   * @param value
   * @param rowIndex (index row data)
   * @param key ( key data )
   * @returns {*}
   */
  renderCustom(type, value, rowIndex, key) {
    const CustomInput = types[type];
    return <CustomInput value={value} onChange={(v) => this.setValue(rowIndex, key, v)}/>
  }

  renderSum(d, rest) {
    const { column, column2 } = rest;

    const v = get(d, column), v2 = get(d, column2);

    if (!v || !v2) {
      return 0;
    }

    return Number(get(d, column)) + Number(get(d, column2));

  }

  /**
   * Render cell
   * @param d (data row)
   * @param rowIndex
   * @param column
   */
  renderCell(d, rowIndex, column) {
    return column.map(({ id, type, ...rest }) => <td
      key={id}>{type === "Sum" ? this.renderSum(d, rest) : this.renderCustom(type, get(d, id), rowIndex, id)}</td>);
  }

  addRow() {
    const { data } = this.state;
    const initData = map(data[0], v => null);
    this.setState({
      data: concat(data, [initData]),
    });

  }

  addColumn(values) {
    const { data, column } = this.state;
    const id               = guid();
    const newColumn        = Object.assign({}, { id }, values);
    const newData          = map(data, o => set(o, id, 0));
    this.setState({
      column: concat(column, [newColumn]),
      data: newData
    });
  }

  openModal() {
    this.setState({
      modal: true,
    });
  }

  render() {
    const { data, column } = this.state;
    return (
      <div>
        <div className={'table'}>
          <table style={{ width: '100%' }}>
            <thead className={'thead'}>
            <tr>
              {column.map((cell => (<th key={cell.id}>{cell.title}</th>)))}
            </tr>
            </thead>
            <tbody className={'tbody'}>
            {data.map(((d, index) => (<tr key={index}>{this.renderCell(d, index, column)}</tr>)))}
            </tbody>
          </table>

          <button className={'btn add-row'} onClick={this.addRow}>Add row</button>
          <button className={'btn add-column'} onClick={this.openModal}>Add column</button>
        </div>

        {this.state.modal && <Modal onClose={() => this.setState({ modal: false }) } addColumn={this.addColumn} column={column} /> }
      </div>
    );
  }
}

Spreadsheet.propTypes    = {
  data: PropTypes.array.isRequired,
  column: PropTypes.array.isRequired,
};
Spreadsheet.defaultProps = {};

export default Spreadsheet;
