import { combineReducers } from 'redux';

import deviceDetail, { IDeviceDetailState } from './deviceDetail';
import deviceList, { IDeviceListState } from './deviceList';
import loadingStatus, { ILoadingStatusState } from './loadingStatus';
import commandOutput, { ICommandOutputState } from './commandOutput';

import currentDevice from './currentDevice';
import devices, { IDevicesState } from './devices';
import attributes from './attributes';
import commands, { ICommandsState } from './commands';
import properties, { IPropertiesState } from './properties';
import modal, { IModalState } from './modals';
import user, { IUserState } from './user';

import error from './error';

const rootReducer = combineReducers({
  deviceDetail,
  deviceList,
  devices,
  loadingStatus,
  commandOutput,
  currentDevice,
  attributes,
  commands,
  properties,
  error,
  modal,
  user
});

export default rootReducer;
