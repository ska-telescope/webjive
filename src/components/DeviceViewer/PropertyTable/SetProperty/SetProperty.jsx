import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SetProperty extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
    const { deviceName, showAddPropertyDialog } = this.props;
    showAddPropertyDialog(deviceName);
  }

  render() {
    return (
      <div className="static-modal">
        <button className="btn btn-outline-secondary" type="button" onClick={this.handleShow}>
          Add new property
        </button>
      </div>
    );
  }
}

SetProperty.propTypes = {
  deviceName: PropTypes.string.isRequired,
  showAddPropertyDialog: PropTypes.func.isRequired
};

export default SetProperty;
