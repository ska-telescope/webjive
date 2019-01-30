export function unique(arr) {
  return arr.filter((x, i) => arr.indexOf(x) === i);
}

export function objectValues(obj) {
  return obj ? Object.keys(obj).map(key => obj[key]) : [];
}
