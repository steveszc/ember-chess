import Piece from "ember-chess/lib/pieces/piece";

export default class Bishop extends Piece {
  type = "bishop";
  hasRecursiveMoves = true;

  moves = [
    (position) => this.forward(this.left(position)),
    (position) => this.forward(this.right(position)),
    (position) => this.back(this.left(position)),
    (position) => this.back(this.right(position)),
  ];
}
