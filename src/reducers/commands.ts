import { FETCH_DEVICE_SUCCESS } from "../actions/actionTypes";

interface IDeviceCommand {
  name: string;
  displevel: string;
}

export interface ICommandsState {
  [deviceName: string]: {
    [commandName: string]: IDeviceCommand;
  };
}

export default function allCommands(state: ICommandsState = {}, action: any) {
  switch (action.type) {
    case FETCH_DEVICE_SUCCESS: {
      const { name, commands } = action.device;
      const hash = (commands || []).reduce(
        (accum: any, command: any) => ({
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
