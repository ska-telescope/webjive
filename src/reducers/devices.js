import { FETCH_DEVICE_SUCCESS } from '../actions/actionTypes';

export default function devices(state = {}, action) {
  switch (action.type) {
    case FETCH_DEVICE_SUCCESS: {
      const { attributes, properties, commands, name, ...core } = action.device;
      return { ...state, [name]: { ...core, name } };
    }

    default:
      return state;
  }
}
