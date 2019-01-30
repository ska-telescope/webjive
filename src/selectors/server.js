import { createSelector } from 'reselect';
import getCommandOutputState from './commandOutput';

const getServerSummary = createSelector(
  getCommandOutputState,
  state => {
    const device = 'sys/database/2';
    const command = 'DbInfo';
    const forDevice = state[device] || {};
    return forDevice[command];
  }
);

export default getServerSummary;
