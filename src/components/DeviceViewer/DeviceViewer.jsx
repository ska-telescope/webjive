import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import AttributeTable from './AttributeTable/AttributeTable';
import CommandTable from './CommandTable/CommandTable';
import PropertyTable from './PropertyTable/PropertyTable';
import ServerInfo from './ServerInfo/ServerInfo';
import DisplevelChooser from './DisplevelChooser/DisplevelChooser';
import DeviceMenu from './DeviceMenu/DeviceMenu';
import Spinner from '../Spinner/Spinner';
import {
  getCurrentDeviceName,
  getCurrentDeviceStateValue,
  getCurrentDeviceHasAttributes,
  getCurrentDeviceHasProperties,
  getCurrentDeviceHasCommands,
  getDispLevels
} from '../../selectors/currentDevice';
import { getDeviceIsLoading } from '../../selectors/loadingStatus';
import { getActiveTab, getEnabledDisplevels } from '../../selectors/deviceDetail';
import { setTab } from '../../actions/deviceList';
import {
  enableDisplevel as enableDisplevelAction,
  disableDisplevel as disableDisplevelAction,
  selectDevice
} from '../../actions/tango';

import './DeviceViewer.css';

class DeviceViewer extends Component {
  componentDidMount() {
    const { onSelectDevice } = this.props;
    const device = this.parseDevice();
    onSelectDevice(device);
  }

  componentDidUpdate(prevProps) {
    const { activeTab, onSelectDevice, onSelectTab } = this.props;
    const device = this.parseDevice();
    if (device !== this.parseDevice(prevProps)) {
      onSelectDevice(device);
    }

    const tab = this.parseTab();
    if (tab && tab !== activeTab) {
      onSelectTab(tab);
    }
  }

  parseDevice(props) {
    return (props || this.props).match.params.device;
  }

  parseTab() {
    const {
      history: {
        location: { hash }
      }
    } = this.props;
    const tab = hash.substr(1);
    return tab || undefined;
  }

  innerContent() {
    const {
      currentState,
      deviceName,
      disableDisplevel,
      displevels,
      enabledList,
      enableDisplevel,
      hasAttributes,
      hasCommands,
      hasProperties,
      loading,
      onSelectTab,
      selectedTab
    } = this.props;

    if (loading) {
      return <Spinner size={4} />;
    }

    const QualityIndicator = ({ state }) => {
      const sub =
        {
          ON: 'on',
          OFF: 'off',
          CLOSE: 'close',
          OPEN: 'open',
          INSERT: 'insert',
          EXTRACT: 'extract',
          MOVING: 'moving',
          STANDBY: 'standy',
          FAULT: 'fault',
          INIT: 'init',
          RUNNING: 'running',
          ALARM: 'alarm',
          DISABLE: 'disable',
          UNKNOWN: 'unknown'
        }[state] || 'invalid';
      return (
        <span className={`state state-${sub}`} title={state}>
          ●{' '}
        </span>
      );
    };

    const views = {
      server: ServerInfo,
      properties: PropertyTable,
      attributes: AttributeTable,
      commands: CommandTable
    };

    const CurrentView = views[selectedTab];

    return (
      <div>
        <Helmet>
          <title>{deviceName}</title>
        </Helmet>
        <div className="device-header">
          <QualityIndicator state={currentState} /> {deviceName}
          {displevels.length > 1 && (
            <DisplevelChooser
              displevels={displevels}
              enabledList={enabledList}
              enableDisplevel={enableDisplevel}
              disableDisplevel={disableDisplevel}
            />
          )}
        </div>
        <div className="device-body">
          <DeviceMenu
            selectedTab={selectedTab}
            onSelectTab={onSelectTab}
            hasProperties={hasProperties}
            hasAttributes={hasAttributes}
            hasCommands={hasCommands}
          />
          <div className="device-view">
            <CurrentView />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <div className="DeviceViewer">{this.innerContent()}</div>;
  }
}

DeviceViewer.propTypes = {
  activeTab: PropTypes.string,
  currentState: PropTypes.string.isRequired,
  deviceName: PropTypes.string.isRequired,
  disableDisplevel: PropTypes.func.isRequired,
  displevels: PropTypes.arrayOf(PropTypes.string).isRequired,
  enabledList: PropTypes.arrayOf(PropTypes.string).isRequired,
  enableDisplevel: PropTypes.func.isRequired,
  hasAttributes: PropTypes.bool,
  hasProperties: PropTypes.bool,
  hasCommands: PropTypes.bool,
  history: PropTypes.shape({
    location: PropTypes.shape({ hash: PropTypes.string })
  }).isRequired,
  loading: PropTypes.bool,
  onSelectDevice: PropTypes.func.isRequired,
  onSelectTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.string
};

DeviceViewer.defaultProps = {
  activeTab: 'server',
  hasAttributes: false,
  hasProperties: false,
  hasCommands: false,
  loading: true,
  selectedTab: 'server'
};

function mapStateToProps(state) {
  return {
    hasAttributes: getCurrentDeviceHasAttributes(state),
    hasProperties: getCurrentDeviceHasProperties(state),
    hasCommands: getCurrentDeviceHasCommands(state),

    loading: getDeviceIsLoading(state),
    selectedTab: getActiveTab(state),

    currentState: getCurrentDeviceStateValue(state),
    deviceName: getCurrentDeviceName(state),
    enabledList: getEnabledDisplevels(state),

    displevels: getDispLevels(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSelectDevice: device => dispatch(selectDevice(device)),
    onSelectTab: tab => dispatch(setTab(tab)),
    enableDisplevel: displevel => dispatch(enableDisplevelAction(displevel)),
    disableDisplevel: displevel => dispatch(disableDisplevelAction(displevel))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeviceViewer)
);
