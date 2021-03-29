import Piece from 'ember-chess/lib/pieces/piece';

export default class Rook extends Piece {
  type = 'rook';
  hasRecursiveMoves = true;

  moves = [
    (position) => this.forward(position),
    (position) => this.right(position),
    (position) => this.back(position),
    (position) => this.left(position),
  ];
}
