import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteDeviceProperty } from '../../actions/tango';

/**
 * Renders a modal dialog for deleting  properties from a device. Rendered in Layout iff state.modal.modalInstance === 'DELETE_PROPERTY'
 */
class DeleteProperty extends Component {
  constructor(props) {
    super(props);
    this.onDeleteProperty = this.onDeleteProperty.bind(this);
  }

  onDeleteProperty(event) {
    const { closeDialog, currentDevice, deleteProperty, entity } = this.props;
    event.preventDefault();
    deleteProperty(currentDevice, entity);
    closeDialog();
  }

  render() {
    const { entity, closeDialog } = this.props;
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Remove property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove property {entity}?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn btn-outline-secondary" onClick={this.onDeleteProperty}>
            Yes
          </Button>
          <Button className="btn btn-outline-secondary" onClick={closeDialog}>
            No
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

DeleteProperty.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  currentDevice: PropTypes.string,
  deleteProperty: PropTypes.func.isRequired,
  entity: PropTypes.string
};

DeleteProperty.defaultProps = {
  currentDevice: '',
  entity: ''
};

function mapDispatchToProps(dispatch) {
  return {
    deleteProperty: (device, name) => dispatch(deleteDeviceProperty(device, name))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(DeleteProperty);
