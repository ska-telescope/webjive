import { createSelector } from 'reselect';
import { getFilter } from './filtering';
import { IDevicesState } from '../reducers/devices';

function getDevicesState(state): IDevicesState {
    return state.devices;
}

export const getDeviceNames = createSelector(
    getDevicesState,
    state => state.nameList
);

export const getCurrentDevice = createSelector(
    getDevicesState,
    state => state.current
);

export const getCurrentDeviceName = createSelector(
    getCurrentDevice,
    device => device ? device.name : undefined
);

export const getCurrentDeviceState = createSelector(
    getCurrentDevice,
    device => device ? device.state : undefined
);

export const getCurrentDeviceAttributes = createSelector(
    getCurrentDevice,
    device => device ? device.attributes || [] : []
);

export const getCurrentDeviceProperties = createSelector(
    getCurrentDevice,
    device => device ? device.properties || [] : []
);

export const getCurrentDeviceCommands = createSelector(
    getCurrentDevice,
    device => device ? device.commands || [] : []
);

export const getHasDevices = createSelector(
    getDeviceNames,
    names => names.length > 0
);

function matchesFilter(name, filter) {
    const words = filter.split(/\s+/);
    const matched = words.filter(word => name.toUpperCase().indexOf(word.toUpperCase()) !== -1);
    return matched.length === words.length;
}

export const getFilteredDeviceNames = createSelector(
    getDeviceNames,
    getFilter,
    (names, filter) => names.filter(name => matchesFilter(name, filter))
);

export const getDeviceIsLoading = createSelector(
    getDevicesState,
    state => state.loadingDevice
);

export const getDeviceNamesAreLoading = createSelector(
    getDevicesState,
    state => state.loadingNames
);

export const getAvailableDataFormats = createSelector(
    getCurrentDeviceAttributes,
    attrs => Object.keys(attrs.reduce((accum, attr) => ({
        ...accum, [attr.dataformat]: true
    }), {}))
);

export const getActiveDataFormat = createSelector(
    getDevicesState,
    state => state.activeDataFormat
);

export const getActiveTab = createSelector(
    getDevicesState,
    state => state.activeTab
);

export const getFilteredCurrentDeviceAttributes = createSelector(
    getCurrentDeviceAttributes,
    getActiveDataFormat,
    (attrs, format) => attrs.filter(attr => attr.dataformat === format)
);

export const getCommandValue = createSelector(
    getDevicesState,
    state => state.commandResults
);

