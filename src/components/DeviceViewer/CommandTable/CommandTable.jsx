import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCurrentDeviceCommands,
  getCurrentDeviceName,
  getCurrentDeviceCommandOutputs
} from '../../../selectors/currentDevice';
import { getEnabledDisplevels } from '../../../selectors/deviceDetail';
import { getCommandOutputsLoading } from '../../../selectors/loadingStatus';
import { getIsLoggedIn } from '../../../selectors/user';
import { executeCommand } from '../../../actions/tango';
import Spinner from '../../Spinner/Spinner';
import NotLoggedIn from '../NotLoggedIn/NotLoggedIn';
import DescriptionDisplay from '../DescriptionDisplay/DescriptionDisplay';
import InputField from '../InputField/InputField';
import { command as commandPropType } from '../../../propTypes/propTypes';
import './CommandTable.css';

const OutputDisplay = ({ value, isLoading }) => {
  if (isLoading) {
    return <Spinner size={1} />;
  }
  if (value) {
    return (
      <div className="output-display">
        <div className="arrow" />
        <div className="output">{value || ''}</div>
      </div>
    );
  }
  return null;
};

OutputDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
};

OutputDisplay.defaultProps = {
  isLoading: false
};

const CommandTable = ({
  commands,
  onExecute,
  currentDeviceName,
  enabledList,
  outputsLoading,
  commandOutputs,
  isLoggedIn
}) => (
  <div className="CommandTable">
    <NotLoggedIn>You are currently not logged in and cannot execute any commands.</NotLoggedIn>
    <table className="separated">
      <tbody>
        {commands &&
          commands.map(
            ({ name, displevel, intype, intypedesc, outtypedesc }) =>
              Object.values(enabledList).indexOf(displevel) > -1 && (
                <tr key={`${name}${displevel}`}>
                  <td>
                    {name}
                    <br />
                    <OutputDisplay value={commandOutputs[name]} isLoading={outputsLoading[name]} />
                  </td>
                  <td className="input">
                    <InputField
                      isEnabled={isLoggedIn}
                      onExecute={onExecute}
                      currentDeviceName={currentDeviceName}
                      commands={commands}
                      name={name}
                      intype={intype}
                    />
                  </td>
                  <td className="description">
                    <DescriptionDisplay
                      description={`Input: ${intypedesc}\nOutput: ${outtypedesc}`}
                    />
                  </td>
                </tr>
              )
          )}
      </tbody>
    </table>
  </div>
);

CommandTable.propTypes = {
  commands: PropTypes.oneOfType([PropTypes.arrayOf(commandPropType), commandPropType]),
  onExecute: PropTypes.func.isRequired,
  currentDeviceName: PropTypes.string,
  enabledList: PropTypes.arrayOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  outputsLoading: PropTypes.object.isRequired, // uses dynamic keys, tricky to validate this with shape()
  // eslint-disable-next-line react/forbid-prop-types
  commandOutputs: PropTypes.object.isRequired, // uses dynamic keys, tricky to validate this with shape()
  isLoggedIn: PropTypes.bool
};

CommandTable.defaultProps = {
  commands: null,
  currentDeviceName: '',
  isLoggedIn: false
};

function mapStateToProps(state) {
  return {
    commands: getCurrentDeviceCommands(state),
    currentDeviceName: getCurrentDeviceName(state),
    enabledList: getEnabledDisplevels(state),

    commandOutputs: getCurrentDeviceCommandOutputs(state),
    outputsLoading: getCommandOutputsLoading(state),

    isLoggedIn: getIsLoggedIn(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onExecute: (command, value, device) => dispatch(executeCommand(command, value, device))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandTable);
