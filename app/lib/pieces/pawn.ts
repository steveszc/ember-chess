import Piece from 'ember-chess/lib/pieces/piece';
import { pieces } from 'ember-chess/lib/pieces';
import type { Position } from 'ember-chess/lib/types';

function isPosition(p: Position | null): p is Position {
  return typeof p === 'string';
}

export default class Pawn extends Piece {
  type = pieces.p;

  // because the moves of pawns depend on the pawn's current board position
  // we must evaluate each possible move given the current board state to see if it is valid,
  // rather than evaluating the resulting position of each move as is done with other pieces
  get availablePositions() {
    return [
      this.moveForwardOne,
      this.moveForwardTwoOnFirstMove,
      this.takeDiagonallyLeft,
      this.takeDiagonallyRight,
    ].filter(isPosition);
  }

  get moveForwardOne() {
    if (!this.position) return null;

    let newPosition = this.forward(this.position);
    let isOnBoard = this.board.isPositionOnBoard(newPosition);
    let pieceAtPosition = this.board.getPosition(newPosition);

    if (isOnBoard && !pieceAtPosition) {
      return newPosition;
    }

    return null;
  }

  get moveForwardTwoOnFirstMove() {
    if (!this.position) return null;

    let newPosition = this.forward(this.forward(this.position));
    let isOnBoard = this.board.isPositionOnBoard(newPosition);
    let pieceInPosition = this.board.getPosition(newPosition);

    if (this.isFirstMove && isOnBoard && !pieceInPosition) {
      return newPosition;
    }

    return null;
  }

  get takeDiagonallyLeft() {
    if (!this.position) return null;

    let newPosition = this.forward(this.left(this.position));
    let isOnBoard = this.board.isPositionOnBoard(newPosition);
    let pieceAtPosition = this.board.getPosition(newPosition);

    if (isOnBoard && pieceAtPosition && pieceAtPosition.color !== this.color) {
      return newPosition;
    }

    return null;
  }

  get takeDiagonallyRight() {
    if (!this.position) return null;

    let newPosition = this.forward(this.right(this.position));
    let isOnBoard = this.board.isPositionOnBoard(newPosition);
    let pieceAtPosition = this.board.getPosition(newPosition);

    if (isOnBoard && pieceAtPosition && pieceAtPosition.color !== this.color) {
      return newPosition;
    }

    return null;
  }
}
