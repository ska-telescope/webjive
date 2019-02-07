import { combineReducers } from 'redux';

import deviceDetail from './deviceDetail';
import deviceList from './deviceList';
import loadingStatus from './loadingStatus';
import commandOutput from './commandOutput';

import currentDevice from './currentDevice';
import devices from './devices';
import attributes from './attributes';
import commands from './commands';
import properties from './properties';
import modal from './modals';
import user from './user';
import filename from './filename';

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
  user,
  filename
});

export default rootReducer;
