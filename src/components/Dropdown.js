import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  render() {
    return (
      <select defaultValue={this.props.value} onChange={(v) => this.props.onChange(v.target.value)}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={4}>5</option>
      </select>
    );
  }
}

Dropdown.propTypes    = {
  onChange: PropTypes.func
};
Dropdown.defaultProps = {};

export default Dropdown;
