import { tracked as t } from 'tracked-built-ins';
import {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
} from 'ember-chess/lib/pieces';
import Fen from 'ember-chess/lib/fen';

const letterToIndex = (string) => string.charCodeAt(0) - 97;

const numberToIndex = (string) => 8 - parseInt(string, 10);

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

  constructor(fen) {
    this.setupBoard(fen);
  }

  setupBoard(fen) {
    if (!fen || !fen.isValid) {
      fen = new Fen();
    }
    fen.pieces.forEach((piece) => this.createPiece(piece));
  }

  createPiece({ type, position, color }) {
    let { row, col } = positionToCoord(position);
    let pieceClasses = {
      pawn: Pawn,
      rook: Rook,
      knight: Knight,
      bishop: Bishop,
      queen: Queen,
      king: King,
    };
    let Piece = pieceClasses[type];

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
