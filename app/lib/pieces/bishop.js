import Piece from "ember-chess/lib/pieces/piece";

export default class Bishop extends Piece {
  type = "bishop";

  get availablePositions() {
    return [
      ...this.getMoves((position) => this.forward(this.left(position))),
      ...this.getMoves((position) => this.forward(this.right(position))),
      ...this.getMoves((position) => this.back(this.left(position))),
      ...this.getMoves((position) => this.back(this.right(position))),
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
