import Piece from "ember-chess/lib/pieces/piece";

export default class King extends Piece {
  type = "king";

  get availablePositions() {
    return [];
  }
}
