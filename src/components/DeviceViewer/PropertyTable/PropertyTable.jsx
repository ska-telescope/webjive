import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentDeviceProperties, getCurrentDeviceName } from '../../../selectors/currentDevice';
import { DELETE_PROPERTY, CREATE_PROPERTY, EDIT_PROPERTY, setModal } from '../../../actions/modal';
import EditProperty from './EditProperty/EditProperty';
import SetProperty from './SetProperty/SetProperty';
import './PropertyTable.css';

const PropertyTable = ({
  properties,
  deviceName,
  showDeletePropertyDialog,
  showEditPropertyDialog,
  showAddPropertyDialog
}) => (
  <div className="PropertyTable">
    <table className="separated">
      <tbody>
        {properties &&
          properties.map(({ name, value }) => (
            <tr key={`${name}${value}`}>
              <td className="name">{name}</td>
              <td className="actions">
                <EditProperty
                  deviceName={deviceName}
                  name={name}
                  value={value}
                  showDeletePropertyDialog={showDeletePropertyDialog}
                  showEditPropertyDialog={showEditPropertyDialog}
                />
              </td>
              <td>{value.join('\n')}</td>
            </tr>
          ))}
      </tbody>
    </table>
    <br />
    <SetProperty deviceName={deviceName} showAddPropertyDialog={showAddPropertyDialog} />
  </div>
);

PropertyTable.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  deviceName: PropTypes.string.isRequired,
  showDeletePropertyDialog: PropTypes.func.isRequired,
  showEditPropertyDialog: PropTypes.func.isRequired,
  showAddPropertyDialog: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    properties: getCurrentDeviceProperties(state),
    deviceName: getCurrentDeviceName(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showDeletePropertyDialog: name => dispatch(setModal(DELETE_PROPERTY, name)),
    showAddPropertyDialog: () => dispatch(setModal(CREATE_PROPERTY)),
    showEditPropertyDialog: name => dispatch(setModal(EDIT_PROPERTY, name))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyTable);
