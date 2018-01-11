import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Number extends Component {
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

Number.propTypes    = {
  onChange: PropTypes.func,
};
Number.defaultProps = {};

export default Number;
