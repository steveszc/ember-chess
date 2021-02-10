const letterToIndex = (string) => string.charCodeAt(0) - 97;
const indexToLetter = (number) => String.fromCharCode(97 + number);

const numberToIndex = (string) => parseInt(string, 10) - 1;
const indexToNumber = (number) => `${number + 1}`;

const positionToCoord = (position) => ({
  row: numberToIndex(position[1]),
  col: letterToIndex(position[0]),
});

export default class Piece {
  constructor({ position, color, board }) {
    this.position = position;
    this.color = color;
    this.board = board;
  }

  #positions = [];
  #position = null;

  get position() {
    return this.#position;
  }

  set position(val) {
    this.#position = val;
    this.#positions.push(val);
  }

  get isFirstMove() {
    return this.#positions.length === 1;
  }

  forward(position) {
    let [col, row] = position;

    if (this.color === "white") {
      return `${col}${parseInt(row, 10) + 1}`;
    }

    if (this.color === "black") {
      return `${col}${parseInt(row, 10) - 1}`;
    }
  }

  back(position) {
    let [col, row] = position;

    if (this.color === "white") {
      return `${col}${parseInt(row, 10) - 1}`;
    }

    if (this.color === "black") {
      return `${col}${parseInt(row, 10) + 1}`;
    }
  }

  right(position) {
    let [col, row] = position;

    if (this.color === "white") {
      return `${String.fromCharCode(col.charCodeAt(0) - 1)}${row}`;
    }

    if (this.color === "black") {
      return `${String.fromCharCode(col.charCodeAt(0) + 1)}${row}`;
    }
  }

  left(position) {
    let [col, row] = position;

    if (this.color === "white") {
      return `${String.fromCharCode(col.charCodeAt(0) + 1)}${row}`;
    }

    if (this.color === "black") {
      return `${String.fromCharCode(col.charCodeAt(0) - 1)}${row}`;
    }
  }

  isPositionOnBoard(position) {
    let [col, row] = position;
    return "abcdefgh".includes(col) && row >= 1 && row <= 8;
  }

  pieceAtPosition(position) {
    if (this.isPositionOnBoard(position)) {
      let { row, col } = positionToCoord(position);
      return this.board[row][col];
    }
  }
}
