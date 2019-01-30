import { FETCH_DEVICE_SUCCESS } from '../actions/actionTypes';

export default function allCommands(state = {}, action) {
  switch (action.type) {
    case FETCH_DEVICE_SUCCESS: {
      const { name, commands } = action.device;
      const hash = (commands || []).reduce(
        (accum, command) => ({
          ...accum,
          [command.name]: command
        }),
        {}
      );
      return { ...state, [name]: hash };
    }

    default:
      return state;
  }
}
