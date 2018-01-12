import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

import set from 'lodash/set';
import get from 'lodash/get';

import types from '../components/index';
import Modal from "../components/Modal";

import { addColumn, addRow, setData } from "../actions";

import '../Spreadsheet.css';

class Spreadsheet extends Component {

  constructor(props) {
    super(props);
    this.state      = {
      modal: false,
    };
    this.renderCell = this.renderCell.bind(this);
    this.openModal = this.openModal.bind(this);
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
    return <CustomInput value={value} onChange={(v) => this.props.setData(rowIndex, key, v)}/>
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

  openModal() {
    this.setState({
      modal: true,
    });
  }

  render() {
    const { data, column } = this.props;
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

          <button className={'btn add-row'} onClick={() => this.props.addRow()}>Add row</button>
          <button className={'btn add-column'} onClick={this.openModal}>Add column</button>
        </div>

        {this.state.modal && <Modal onClose={() => this.setState({ modal: false }) } addColumn={this.props.addColumn} column={column} /> }
      </div>
    );
  }
}

Spreadsheet.propTypes    = {
  data: PropTypes.array.isRequired,
  column: PropTypes.array.isRequired,
};
Spreadsheet.defaultProps = {};

const mapStateToProps = ( {column, data} ) => ({
  column,
  data
});

const mapDispatchToProps = (dispatch) => ({
  addRow: () => dispatch(addRow()),
  addColumn: (values) => dispatch(addColumn(values)),
  setData: (rowIndex, key, value) => dispatch(setData(rowIndex, key, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spreadsheet);
