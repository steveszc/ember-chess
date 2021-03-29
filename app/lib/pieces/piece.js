export default class Piece {
  constructor({ position, color, board }) {
    this.position = position;
    this.color = color;
    this.board = board;
  }

  hasRecursiveMoves = false;
  moves = [];
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

    if (this.color === 'white') {
      return `${col}${parseInt(row, 10) + 1}`;
    }

    if (this.color === 'black') {
      return `${col}${parseInt(row, 10) - 1}`;
    }
  }

  back(position) {
    let [col, row] = position;

    if (this.color === 'white') {
      return `${col}${parseInt(row, 10) - 1}`;
    }

    if (this.color === 'black') {
      return `${col}${parseInt(row, 10) + 1}`;
    }
  }

  right(position) {
    let [col, row] = position;

    if (this.color === 'white') {
      return `${String.fromCharCode(col.charCodeAt(0) - 1)}${row}`;
    }

    if (this.color === 'black') {
      return `${String.fromCharCode(col.charCodeAt(0) + 1)}${row}`;
    }
  }

  left(position) {
    let [col, row] = position;

    if (this.color === 'white') {
      return `${String.fromCharCode(col.charCodeAt(0) + 1)}${row}`;
    }

    if (this.color === 'black') {
      return `${String.fromCharCode(col.charCodeAt(0) - 1)}${row}`;
    }
  }

  getPositions(move) {
    let positions = [];
    let position = this.position;

    do {
      let newPosition = move(position);
      let isOnBoard = this.board.isPositionOnBoard(newPosition);
      let pieceAtPosition = this.board.pieceAtPosition(newPosition);

      if (
        isOnBoard &&
        (!pieceAtPosition || pieceAtPosition.color !== this.color)
      ) {
        positions.push(newPosition);
        position = newPosition;
      }

      if (!isOnBoard || pieceAtPosition) break;
    } while (this.hasRecursiveMoves);
    return positions;
  }

  get availablePositions() {
    return this.moves.map((move) => this.getPositions(move)).flat();
  }
}
