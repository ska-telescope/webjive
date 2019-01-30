import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setDeviceProperty } from '../../actions/tango';
import { getCurrentDeviceProperties } from '../../selectors/currentDevice';

/**
 * Renders a modal dialog for deleting  properties from a device. Rendered in Layout iff state.modal.modalInstance === 'EDIT_PROPERTY'
 */
class EditProperty extends Component {
  constructor(props) {
    super(props);
    this.onEditProperty = this.onEditProperty.bind(this);
    this.handleChange = this.handleChange.bind(this);
    const { properties, entity } = this.props;
    const prop = properties.find(p => p.name === entity);
    this.state = { value: prop.value };
  }

  onEditProperty(event) {
    const { editProperty, currentDevice, entity, closeDialog } = this.props;
    const { value } = this.state;
    event.preventDefault();
    editProperty(currentDevice, entity, [value]);
    closeDialog();
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  render() {
    const { entity, closeDialog } = this.props;
    const { value } = this.state;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Edit property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">{entity}</span>
            </div>
            <input
              type="text"
              className="form-control"
              value={value}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ whiteSpace: 'normal', fontStyle: 'italic', paddingTop: '0.5em' }}>
            WARNING: Property values will currently be set as singular values, i.e., arrays of
            strings are not yet supported.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-outline-secondary" onClick={this.onEditProperty}>
            Save
          </Button>
          <Button className="btn btn-outline-secondary" onClick={closeDialog}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
EditProperty.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  currentDevice: PropTypes.string,
  editProperty: PropTypes.func.isRequired,
  entity: PropTypes.string,
  properties: PropTypes.arrayOf(PropTypes.string)
};

EditProperty.defaultProps = {
  currentDevice: '',
  entity: '',
  properties: []
};

function mapStateToProps(state) {
  return {
    properties: getCurrentDeviceProperties(state)
  };
}
function mapDispatchToProps(dispatch) {
  return {
    editProperty: (device, name, value) => dispatch(setDeviceProperty(device, name, value))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProperty);
