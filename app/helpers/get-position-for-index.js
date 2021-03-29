import { helper } from '@ember/component/helper';
const indexToLetter = (number) => String.fromCharCode(97 + number);
const indexToNumber = (number) => `${number + 1}`;

export default helper(function getPositionForIndex([row, col] /*, hash*/) {
  return `${indexToLetter(col)}${indexToNumber(row)}`;
});
