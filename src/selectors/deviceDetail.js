import { createSelector } from 'reselect';
import { getCurrentDeviceAttributes } from './currentDevice';

function getDeviceViewState(state) {
  return state.deviceDetail;
}

export const getActiveDataFormat = createSelector(
  getDeviceViewState,
  state => state.activeDataFormat
);

export const getActiveTab = createSelector(
  getDeviceViewState,
  state => state.activeTab
);

export const getFilteredCurrentDeviceAttributes = createSelector(
  getCurrentDeviceAttributes,
  getActiveDataFormat,
  (attrs, format) => attrs.filter(attr => attr.dataformat === format)
);

export const getEnabledDisplevels = createSelector(
  getDeviceViewState,
  state => state.enabledDisplevels
);
