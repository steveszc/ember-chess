import Piece from "ember-chess/lib/pieces/piece";

export default class Rook extends Piece {
  type = "rook";

  get availablePositions() {
    return [
      ...this.getMoves((position) => this.forward(position)),
      ...this.getMoves((position) => this.right(position)),
      ...this.getMoves((position) => this.back(position)),
      ...this.getMoves((position) => this.left(position)),
    ].filter(Boolean);
  }

  getMoves(move) {
    let positions = [];
    let position = this.position;

    while (true) {
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
    }
    return positions;
  }
}
