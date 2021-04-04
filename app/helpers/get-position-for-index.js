import { helper } from '@ember/component/helper';
const indexToLetter = (number) => String.fromCharCode(97 + number);
const indexToNumber = (number) => `${8 - number}`;

export default helper(function getPositionForIndex([row, col] /*, hash*/) {
  return `${indexToLetter(col)}${indexToNumber(row)}`;
});
