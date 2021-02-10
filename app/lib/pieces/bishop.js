import Piece from "ember-chess/lib/pieces/piece";

export default class Bishop extends Piece {
  type = "bishop";

  get availablePositions() {
    return [];
  }
}
