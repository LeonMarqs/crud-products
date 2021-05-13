export function stringToArray(str): [] {
  const string = str;
  let array = string.split(" ");
  return array;
}

export function arrayToStringWithDash(arr: Array<string>) {
  let stringDash = arr.join('-').toLowerCase();
  return stringDash;
}