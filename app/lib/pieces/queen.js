import Piece from "ember-chess/lib/pieces/piece";

export default class Queen extends Piece {
  type = "queen";

  get availablePositions() {
    return [
      ...this.getPositions((position) => this.forward(position)),
      ...this.getPositions((position) => this.right(position)),
      ...this.getPositions((position) => this.left(position)),
      ...this.getPositions((position) => this.back(position)),
      ...this.getPositions((position) => this.forward(this.left(position))),
      ...this.getPositions((position) => this.forward(this.right(position))),
      ...this.getPositions((position) => this.back(this.left(position))),
      ...this.getPositions((position) => this.back(this.right(position))),
    ].filter(Boolean);
  }
}
