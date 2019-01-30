import { objectValues } from '../utils';

export default function queryDeviceWithName(state, name) {
  const device = state.devices[name];
  if (device == null) {
    return device;
  }

  const properties = [...objectValues(state.properties[name])];
  const attributes = [...objectValues(state.attributes[name])];
  const commands = [...objectValues(state.commands[name])];

  return { ...device, properties, attributes, commands };
}
