import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getModalInstance, getEntity, getIsShowing } from '../../selectors/modals';
import {
  CREATE_PROPERTY,
  EDIT_PROPERTY,
  DELETE_PROPERTY,
  FILENAME,
  clearModal
} from '../../actions/modal';
import { getCurrentDeviceName } from '../../selectors/currentDevice';
import DeleteProperty from './DeleteProperty';
import AddProperty from './AddProperty';
import EditProperty from './EditProperty';
import Login from './Login';
import Filename from './Filename';

/**
 * Observes the the state of 'modal' and renders the associated modal dialog.
 */
const ModalDialog = ({ closeDialog, entity, modalInstance, currentDevice }) => {
  switch (modalInstance) {
    case CREATE_PROPERTY:
      return (
        <AddProperty entity={entity} currentDevice={currentDevice} closeDialog={closeDialog} />
      );
    case EDIT_PROPERTY:
      return (
        <EditProperty entity={entity} currentDevice={currentDevice} closeDialog={closeDialog} />
      );
    case DELETE_PROPERTY:
      return (
        <DeleteProperty entity={entity} currentDevice={currentDevice} closeDialog={closeDialog} />
      );
    case FILENAME:
      return <Filename closeDialog={closeDialog} />;
    case 'LOGIN':
      return <Login closeDialog={closeDialog} />;
    default:
      return null;
  }
};

ModalDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  currentDevice: PropTypes.string.isRequired,
  entity: PropTypes.string.isRequired,
  modalInstance: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    isShowing: getIsShowing(state),
    entity: getEntity(state),
    modalInstance: getModalInstance(state),
    currentDevice: getCurrentDeviceName(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeDialog: () => dispatch(clearModal())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDialog);
