import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      type: 'Number',
      column: '',
      column2: ''
    };
    this.onChange = this.onChange.bind(this);
    this.addColumn = this.addColumn.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  addColumn() {
    this.props.addColumn(this.state);
    this.props.onClose();
  }

  render() {
    return (
      <div className={'modal'}>
        <button className={'btn x'} onClick={() => this.props.onClose()}>x</button>
        <input name={'title'} type="text" className={'call-name'} value={this.state.title} onChange={this.onChange}/>
        <select name={'type'} defaultValue={this.state.type} onChange={this.onChange}>
          <option value="Number">Number</option>
          <option value="Dropdown">Dropdown</option>
          <option value="Sum">Sum</option>
        </select>

        { this.state.type === "Sum" && <div>

          <div>
            <div>Column</div>
            <select name={'column'} defaultValue={this.state.type} onChange={this.onChange}>
              <option value="">Select column</option>
              {this.props.column.map(m => m.type === "Sum" ? null : <option key={m.id} value={m.id}>{m.title}</option>)}
            </select>
          </div>

          <div>
            <div>Column2</div>
            <select name={'column2'} defaultValue={this.state.type} onChange={this.onChange}>
              <option value="">Select column</option>
              {this.props.column.map(m => m.type === "Sum" ? null : <option key={m.id} value={m.id}>{m.title}</option>)}
            </select>
          </div>

        </div> }
        <button className={'btn'} onClick={this.addColumn}>Add Column</button>
      </div>
    );
  }
}

Modal.propTypes    = {};
Modal.defaultProps = {};

export default Modal;
