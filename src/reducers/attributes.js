import { FETCH_DEVICE_SUCCESS, ATTRIBUTE_CHANGE } from '../actions/actionTypes';

export default function attributes(state = {}, action) {
  switch (action.type) {
    case FETCH_DEVICE_SUCCESS: {
      const { name, attributes: attrs } = action.device;
      const hash = (attrs || []).reduce(
        (accum, attribute) => ({
          ...accum,
          [attribute.name]: attribute
        }),
        {}
      );
      return { ...state, [name]: hash };
    }

    case ATTRIBUTE_CHANGE: {
      const {
        data: { value },
        name,
        device
      } = action.data;
      const oldDevice = state[device];
      const oldAttribute = oldDevice[name];
      return {
        ...state,
        [device]: {
          ...oldDevice,
          [name]: { ...oldAttribute, value }
        }
      };
    }

    default:
      return state;
  }
}
