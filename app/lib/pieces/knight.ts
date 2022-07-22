import Piece from 'ember-chess/lib/pieces/piece';
import type { Position } from 'ember-chess/lib/types';

export default class Knight extends Piece {
  type = 'knight';

  moves = [
    (position: Position) => this.forward(this.forward(this.left(position))),
    (position: Position) => this.forward(this.forward(this.right(position))),
    (position: Position) => this.back(this.back(this.left(position))),
    (position: Position) => this.back(this.back(this.right(position))),
    (position: Position) => this.right(this.right(this.forward(position))),
    (position: Position) => this.right(this.right(this.back(position))),
    (position: Position) => this.left(this.left(this.forward(position))),
    (position: Position) => this.left(this.left(this.back(position))),
  ];
}
