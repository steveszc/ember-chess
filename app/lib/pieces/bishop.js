import Piece from "ember-chess/lib/pieces/piece";

export default class Bishop extends Piece {
  type = "bishop";

  get availablePositions() {
    return [
      ...this.getPositions((position) => this.forward(this.left(position))),
      ...this.getPositions((position) => this.forward(this.right(position))),
      ...this.getPositions((position) => this.back(this.left(position))),
      ...this.getPositions((position) => this.back(this.right(position))),
    ].filter(Boolean);
  }
}
