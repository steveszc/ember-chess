import { helper } from '@ember/component/helper';
import { Position } from 'ember-chess/lib/types';
const indexToLetter = (number: number) => String.fromCharCode(97 + number);
const indexToNumber = (number: number) => `${8 - number}`;

const getPositionForIndex = helper(function getPositionForIndex (
  [row, col]: [number, number] /*, hash*/
) {
  return `${indexToLetter(col)}${indexToNumber(row)}` as Position;
});

export default getPositionForIndex;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'get-position-for-index': typeof getPositionForIndex;
  }
}
