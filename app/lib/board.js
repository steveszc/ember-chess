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

  #capturedPieces = t([]);

  get grid() {
    return this.#grid;
  }

  get capturedPieces() {
    return this.#capturedPieces;
  }

  get whiteCapturedPieces() {
    return this.#capturedPieces.filter((piece) => piece.color === 'white');
  }

  get blackCapturedPieces() {
    return this.#capturedPieces.filter((piece) => piece.color === 'black');
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
    let board = this;
    let pieceClasses = {
      pawn: Pawn,
      rook: Rook,
      knight: Knight,
      bishop: Bishop,
      queen: Queen,
      king: King,
    };
    let Piece = pieceClasses[type];

    this.setPosition(position, new Piece({ color, board }));
  }

  move(fromPosition, toPosition) {
    let piece = this.getPosition(fromPosition);
    let destinationPiece = this.getPosition(toPosition);

    this.setPosition(fromPosition, _);
    this.setPosition(toPosition, piece);

    if (destinationPiece) {
      this.#capturedPieces.push(destinationPiece);
    }
  }

  isPositionOnBoard(position) {
    let [col, row] = position;
    return 'abcdefgh'.includes(col) && row >= 1 && row <= 8;
  }

  getPosition(position) {
    if (this.isPositionOnBoard(position)) {
      let { row, col } = positionToCoord(position);
      return this.#grid[row][col];
    }
  }

  setPosition(position, piece) {
    if (this.isPositionOnBoard(position)) {
      let { row, col } = positionToCoord(position);
      this.#grid[row][col] = piece;
      if (piece) piece.position = position;
    }
  }
}
