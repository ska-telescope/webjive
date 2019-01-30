import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setDeviceProperty } from '../../actions/tango';

/**
 * Renders a modal dialog for adding new properties to a device. Rendered in Layout iff state.modal.modalInstance === 'CREATE_PROPERTY'
 */
class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.onAddProperty = this.onAddProperty.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { formValues: { name: '', value: '' }, valid: false };
  }

  onAddProperty(event) {
    event.preventDefault();
    const { addProperty, closeDialog, currentDevice } = this.props;
    const {
      formValues: { name, value }
    } = this.state;
    addProperty(currentDevice, name, [value]);
    closeDialog();
  }

  handleChange(event) {
    event.preventDefault();
    const { formValues } = this.state;
    const { name, value } = event.target;
    formValues[name] = value;
    this.setState({ formValues });
    if (name.length > 0) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  }

  render() {
    const { closeDialog } = this.props;
    const {
      formValues: { name, value },
      valid
    } = this.state;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Add property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Name</span>
            </div>
            <input
              type="text"
              name="name"
              className="form-control"
              autoComplete="off"
              value={name}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Value</span>
            </div>
            <input
              type="text"
              name="value"
              className="form-control"
              value={value}
              onChange={this.handleChange}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="btn btn-outline-secondary"
            onClick={this.onAddProperty}
            disabled={!valid}
          >
            Create
          </Button>
          <Button className="btn btn-outline-secondary" onClick={closeDialog}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

AddProperty.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  addProperty: PropTypes.func.isRequired,
  currentDevice: PropTypes.string.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    addProperty: (device, name, value) => dispatch(setDeviceProperty(device, name, value))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddProperty);
