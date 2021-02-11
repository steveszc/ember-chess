import Piece from "ember-chess/lib/pieces/piece";

export default class Rook extends Piece {
  type = "rook";

  get availablePositions() {
    return [
      ...this.getPositions((position) => this.forward(position)),
      ...this.getPositions((position) => this.right(position)),
      ...this.getPositions((position) => this.back(position)),
      ...this.getPositions((position) => this.left(position)),
    ].filter(Boolean);
  }
}
