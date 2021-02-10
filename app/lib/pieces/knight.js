import Piece from "ember-chess/lib/pieces/piece";

export default class Knight extends Piece {
  type = "knight";

  get availablePositions() {
    return [];
  }
}
