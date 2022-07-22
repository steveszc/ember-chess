import Piece from 'ember-chess/lib/pieces/piece';
import type { Position } from 'ember-chess/lib/types';

export default class Bishop extends Piece {
  type = 'bishop';
  hasRecursiveMoves = true;

  moves = [
    (position: Position) => this.forward(this.left(position)),
    (position: Position) => this.forward(this.right(position)),
    (position: Position) => this.back(this.left(position)),
    (position: Position) => this.back(this.right(position)),
  ];
}
