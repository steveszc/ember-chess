import Piece from 'ember-chess/lib/pieces/piece';
import { pieces } from 'ember-chess/lib/pieces';
import type { Position } from 'ember-chess/lib/types';

export default class King extends Piece {
  type = pieces.k;

  moves = [
    (position: Position) => this.forward(position),
    (position: Position) => this.right(position),
    (position: Position) => this.left(position),
    (position: Position) => this.back(position),
    (position: Position) => this.forward(this.left(position)),
    (position: Position) => this.forward(this.right(position)),
    (position: Position) => this.back(this.left(position)),
    (position: Position) => this.back(this.right(position)),
  ];
}
