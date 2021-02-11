import Piece from "ember-chess/lib/pieces/piece";

export default class Knight extends Piece {
  type = "knight";

  moves = [
    (position) => this.forward(this.forward(this.left(position))),
    (position) => this.forward(this.forward(this.right(position))),
    (position) => this.back(this.back(this.left(position))),
    (position) => this.back(this.back(this.right(position))),
    (position) => this.right(this.right(this.forward(position))),
    (position) => this.right(this.right(this.back(position))),
    (position) => this.left(this.left(this.forward(position))),
    (position) => this.left(this.left(this.back(position))),
  ];
}
