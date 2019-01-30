import { createSelector } from 'reselect';

function getLoadingStatusState(state) {
  return state.loadingStatus;
}

export const getDeviceIsLoading = createSelector(
  getLoadingStatusState,
  state => state.loadingDevice
);

export const getDeviceNamesAreLoading = createSelector(
  getLoadingStatusState,
  state => state.loadingNames
);

export const getCommandOutputsLoading = createSelector(
  getLoadingStatusState,
  state => state.loadingOutput
);
