import Piece from "ember-chess/lib/pieces/piece";

export default class Rook extends Piece {
  type = "rook";

  get availablePositions() {
    return [];
  }
}
