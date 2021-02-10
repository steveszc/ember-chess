import Piece from "ember-chess/lib/pieces/piece";

export default class Queen extends Piece {
  type = "queen";

  get availablePositions() {
    return [];
  }
}
