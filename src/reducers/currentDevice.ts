export default function(state = "", action: any) {
  switch (action.type) {
    case "SELECT_DEVICE":
      return action.name;
    default:
      return state;
  }
}
