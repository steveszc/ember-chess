import Piece from "ember-chess/lib/pieces/piece";

export default class King extends Piece {
  type = "king";

  moves = [
    (position) => this.forward(position),
    (position) => this.right(position),
    (position) => this.left(position),
    (position) => this.back(position),
    (position) => this.forward(this.left(position)),
    (position) => this.forward(this.right(position)),
    (position) => this.back(this.left(position)),
    (position) => this.back(this.right(position)),
  ];
}
