/**
 * @param { String } str
 * @returns { String }
 */
export function getPrettyName(str) {
  const string = str || "";

  if (string.length > 15) {
    const subString = string.substring(0, 13);
    return `${subString}...`;
  }

  return string;
}
