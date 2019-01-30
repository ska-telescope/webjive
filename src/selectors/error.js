export function getError(state) {
  return state.error;
}

export function hasError(state) {
  return state.error && state.error !== '';
}
