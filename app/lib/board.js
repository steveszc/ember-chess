import { tracked as t } from 'tracked-built-ins';
import {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
} from 'ember-chess/lib/pieces';

const letterToIndex = (string) => string.charCodeAt(0) - 97;
//const indexToLetter = (number) => String.fromCharCode(97 + number);

const numberToIndex = (string) => parseInt(string, 10) - 1;
//const indexToNumber = (number) => `${number + 1}`;

const positionToCoord = (position) => ({
  row: numberToIndex(position[1]),
  col: letterToIndex(position[0]),
});

const _ = null;

export default class Board {
  #grid = t([
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
  ]);

  get grid() {
    return this.#grid;
  }

  constructor() {
    this.setupBoard();
  }

  setupBoard() {
    let color = 'white';
    this.createPiece(Rook, { position: 'a1', color });
    this.createPiece(Knight, { position: 'b1', color });
    this.createPiece(Bishop, { position: 'c1', color });
    this.createPiece(Queen, { position: 'd1', color });
    this.createPiece(King, { position: 'e1', color });
    this.createPiece(Bishop, { position: 'f1', color });
    this.createPiece(Knight, { position: 'g1', color });
    this.createPiece(Rook, { position: 'h1', color });
    this.createPiece(Pawn, { position: 'a2', color });
    this.createPiece(Pawn, { position: 'b2', color });
    this.createPiece(Pawn, { position: 'c2', color });
    this.createPiece(Pawn, { position: 'd2', color });
    this.createPiece(Pawn, { position: 'e2', color });
    this.createPiece(Pawn, { position: 'f2', color });
    this.createPiece(Pawn, { position: 'g2', color });
    this.createPiece(Pawn, { position: 'h2', color });

    color = 'black';
    this.createPiece(Rook, { position: 'a8', color });
    this.createPiece(Knight, { position: 'b8', color });
    this.createPiece(Bishop, { position: 'c8', color });
    this.createPiece(Queen, { position: 'd8', color });
    this.createPiece(King, { position: 'e8', color });
    this.createPiece(Bishop, { position: 'f8', color });
    this.createPiece(Knight, { position: 'g8', color });
    this.createPiece(Rook, { position: 'h8', color });
    this.createPiece(Pawn, { position: 'a7', color });
    this.createPiece(Pawn, { position: 'b7', color });
    this.createPiece(Pawn, { position: 'c7', color });
    this.createPiece(Pawn, { position: 'd7', color });
    this.createPiece(Pawn, { position: 'e7', color });
    this.createPiece(Pawn, { position: 'f7', color });
    this.createPiece(Pawn, { position: 'g7', color });
    this.createPiece(Pawn, { position: 'h7', color });
  }

  createPiece(Piece, { position, color }) {
    let { row, col } = positionToCoord(position);

    this.#grid[row][col] = new Piece({ position, color, board: this });
  }

  move(fromPosition, toPosition) {
    let from = positionToCoord(fromPosition);
    let to = positionToCoord(toPosition);
    let piece = this.#grid[from.row][from.col];
    this.#grid[from.row][from.col] = null;
    this.#grid[to.row][to.col] = piece;
    piece.position = toPosition;
  }

  isPositionOnBoard(position) {
    let [col, row] = position;
    return 'abcdefgh'.includes(col) && row >= 1 && row <= 8;
  }

  pieceAtPosition(position) {
    if (this.isPositionOnBoard(position)) {
      let { row, col } = positionToCoord(position);
      return this.#grid[row][col];
    }
  }
}
