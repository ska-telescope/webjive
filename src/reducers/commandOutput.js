import { EXECUTE_COMMAND_COMPLETE } from '../actions/actionTypes';

export default function commandOutput(state = {}, action) {
  switch (action.type) {
    case EXECUTE_COMMAND_COMPLETE: {
      const { command, result, device } = action;
      const forDevice = { ...state[device], [command]: result };
      return { ...state, [device]: forDevice };
    }

    default:
      return state;
  }
}
