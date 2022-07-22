import Piece from 'ember-chess/lib/pieces/piece';
import type { Position } from 'ember-chess/lib/types';

export default class Rook extends Piece {
  type = 'rook';
  hasRecursiveMoves = true;

  moves = [
    (position: Position) => this.forward(position),
    (position: Position) => this.right(position),
    (position: Position) => this.back(position),
    (position: Position) => this.left(position),
  ];
}
