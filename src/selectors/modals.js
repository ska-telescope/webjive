import { createSelector } from 'reselect';

function getModalState(state) {
  return state.modal;
}
export const getModalInstance = createSelector(
  getModalState,
  state => state.modalInstance
);

export const getEntity = createSelector(
  getModalState,
  state => state.entity
);

export const getIsShowing = createSelector(
  getModalState,
  state => state.entity !== ''
);
