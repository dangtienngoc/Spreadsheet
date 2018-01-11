import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <input value={this.props.value} onChange={this.onChange} onBlur={this.onChange} />
    );
  }
}

Input.propTypes    = {
  onChange: PropTypes.func,
};
Input.defaultProps = {};

export default Input;
