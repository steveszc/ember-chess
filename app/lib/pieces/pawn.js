import Piece from "ember-chess/lib/pieces/piece";

export default class Pawn extends Piece {
  type = "pawn";

  get availablePositions() {
    return [
      this.moveForwardOne,
      this.moveForwardTwoOnFirstMove,
      this.takeDiagonallyLeft,
      this.takeDiagonallyRight,
    ].filter(Boolean);
  }

  get moveForwardOne() {
    let newPosition = this.forward(this.position);
    let isOnBoard = this.board.isPositionOnBoard(newPosition);
    let pieceAtPosition = this.board.pieceAtPosition(newPosition);
    if (isOnBoard && !pieceAtPosition) {
      return newPosition;
    }
  }

  get moveForwardTwoOnFirstMove() {
    let newPosition = this.forward(this.forward(this.position));
    let isOnBoard = this.board.isPositionOnBoard(newPosition);
    let pieceInPosition = this.board.pieceAtPosition(newPosition);
    if (this.isFirstMove && isOnBoard && !pieceInPosition) {
      return newPosition;
    }
  }

  get takeDiagonallyLeft() {
    let newPosition = this.forward(this.left(this.position));
    let isOnBoard = this.board.isPositionOnBoard(newPosition);
    let pieceAtPosition = this.board.pieceAtPosition(newPosition);

    if (isOnBoard && pieceAtPosition && pieceAtPosition.color !== this.color) {
      return newPosition;
    }
  }

  get takeDiagonallyRight() {
    let newPosition = this.forward(this.right(this.position));
    let isOnBoard = this.board.isPositionOnBoard(newPosition);
    let pieceAtPosition = this.board.pieceAtPosition(newPosition);

    if (isOnBoard && pieceAtPosition && pieceAtPosition.color !== this.color) {
      return newPosition;
    }
  }
}
