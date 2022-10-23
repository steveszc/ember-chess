import { tracked as t, TrackedArray } from 'tracked-built-ins';
import { pieceClasses } from 'ember-chess/lib/pieces';
import Fen from 'ember-chess/lib/fen';

import type { Position, Coord, Row, Col, Color, PieceType, PieceInstance } from 'ember-chess/lib/types';

const letterToIndex = (string: string) => string.charCodeAt(0) - 97;
const numberToIndex = (string: string) => 8 - parseInt(string, 10);

const positionToCoord = (position: Position): Coord => ({
  row: numberToIndex(position[1] as Row),
  col: letterToIndex(position[0] as Col),
});

const _ = null;

export default class Board {
  constructor(fen: Fen | undefined) {
    this.setupBoard(fen);
  }

  #grid: TrackedArray<TrackedArray<PieceInstance | typeof _>> = t([
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
    t([_, _, _, _, _, _, _, _]),
  ]);

  #capturedPieces: TrackedArray<PieceInstance> = t([]);

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

  setupBoard(fen?: Fen) {
    if (!fen || !fen.isValid) {
      fen = new Fen();
    }
    fen.pieces.forEach((piece) => this.createPiece(piece));
  }

  createPiece({ type, position, color }: { type: PieceType, position: Position; color: Color; }) {
    let board = this;
    let Piece = pieceClasses[type];

    this.setPosition(position, new Piece({ color, board }));
  }

  move(fromPosition: Position, toPosition: Position) {
    let piece = this.getPosition(fromPosition);

    if (!piece) return;

    let destinationPiece = this.getPosition(toPosition);

    this.setPosition(fromPosition, _);
    this.setPosition(toPosition, piece);

    if (destinationPiece) {
      this.#capturedPieces.push(destinationPiece);
    }

    if (this.isPawnPromotion(piece, toPosition)) {
      this.createPiece({ type: 'queen', position: toPosition, color: piece.color });
    }
  }

  isPawnPromotion(piece: PieceInstance, position: Position) {
    if (piece?.type === 'pawn' && piece?.color === 'black' && position.endsWith('1')) return true;
    if (piece?.type === 'pawn' && piece?.color === 'white' && position.endsWith('8')) return true;

    return false;
  }

  isPositionOnBoard(position: Position) {
    let col = position[0] as Col;
    let row = position[1] as Row;

    let rowInt = parseInt(row, 10);

    return 'abcdefgh'.includes(col) && rowInt >= 1 && rowInt <= 8;
  }

  getPosition(position: Position) {
    if (this.isPositionOnBoard(position)) {
      let { row, col } = positionToCoord(position);

      let content = this?.grid?.[row]?.[col];

      return content ?? null;
    }

    return null;
  }

  setPosition(position: Position, piece: PieceInstance | typeof _) {
    if (this.isPositionOnBoard(position)) {
      let { row, col } = positionToCoord(position);

      // @ts-expect-error object may be undefined???
      this.#grid[row][col] = piece;

      if (piece) piece.position = position;
    }
  }
}
